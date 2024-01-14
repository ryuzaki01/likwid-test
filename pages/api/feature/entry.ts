import type {NextApiRequest, NextApiResponse} from "next"
import { Redis } from '@upstash/redis'
import { ObjectId } from 'mongodb'

import db from 'lib/db'
import { discordRefreshToken } from "lib/discord"
import { intersectionBy } from "utils/array"
import { oauth } from "../social/twitter"
import {LikwidFeature, FeatureTask, TaskDiscord} from "types/common";

const redis = Redis.fromEnv()
const account = db.collection('account')
const featureEntry = db.collection('feature_entry')
const feature = db.collection<LikwidFeature>('feature')

const getMember = (guild_id: string, access_token: string) => fetch(`https://discord.com/api/v10/users/@me/guilds/${guild_id}/member`, {
  headers: {
    authorization: `Bearer ${access_token}`
  }
}).then(response => response.json())
  .catch(e => {
    console.error(e.message)

    return []
  })

const handleFeatureEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }
  
  const { featureId, wallet } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body

  if (!wallet) {
    return res.json({
      status: 'ERROR',
      code: 408,
      message: 'Invalid session, please reconnect your wallet',
      feature_id: featureId
    })
  }

  const featureData = await feature.findOne({
    _id: new ObjectId(featureId)
  })

  if (!featureData) {
    return res.json({
      status: 'ERROR',
      code: 404,
      message: 'Feature not found',
      feature_id: featureId
    })
  }

  let accountData = await account.findOne({
    wallet: {
      $regex: wallet,
      $options: 'i'
    }
  })

  if (!accountData) {
    await account.insertOne({
      wallet: wallet,
      exp: 0
    })

    accountData = await account.findOne({
      wallet: {
        $regex: wallet,
        $options: 'i'
      }
    })
  }

  const entryQuery: any[] = [{
    wallet: {
      $regex: wallet,
      $options: 'i'
    }
  }]

  if (accountData?.discord_id) {
    entryQuery.push({
      discord_id: accountData?.discord_id,
    })
  }

  if (accountData?.twitter_id) {
    entryQuery.push({
      twitter_id: accountData?.twitter_id,
    })
  }

  const featureEntryData = await featureEntry.findOne({
    feature_id: featureId,
    $or: entryQuery
  })

  if (featureEntryData) {
    return res.json({
      status: 'ERROR',
      code: 403,
      message: 'You already completed this feature',
      feature_id: featureId
    })
  }

  let cachedEntry: FeatureTask[] = (await redis
    .get(`entry:${featureData._id.toString()}:${accountData?.wallet}`)
    .then((res: any) => JSON.parse(res))
    .catch(() => null)) || []

  const tasks = await Promise.all((featureData.tasks || []).map(async (r: FeatureTask) => {
    if (r.type === 'connection') {
      const isConnectedWallet = !!(r.name === 'wallet' && accountData?.wallet)
      const isConnectedDiscord = !!(r.name === 'discord' && accountData?.discord_id)
      const isConnectedTwitter = !!(r.name === 'twitter' && accountData?.twitter_id)

      r.passes = isConnectedWallet || isConnectedDiscord || isConnectedTwitter
    }

    if (r.type === 'profile') {
      const isUsernameSet = !!(r.name === 'username' && accountData?.username && accountData?.username !== '')
      const isBioSet = !!(r.name === 'bio' && accountData?.bio && accountData?.bio !== '')
      const isAvatarSet = !!(r.name === 'avatar' && accountData?.avatar && accountData?.avatar !== '')

      r.passes = isUsernameSet || isBioSet || isAvatarSet
    }

    if (r.type === 'discord') {
      const cachedDiscordEntry = cachedEntry.find((e) => e.type === 'discord' && e.id === r.id)
      if (cachedDiscordEntry) {
        r.passes = true

        return r
      }

      if (!accountData?.discord_id) {
        return r
      }

      if (r.id === '') {
        r.passes = true

        return r
      }

      if (!accountData?.discord_access_token && accountData?.discord_id) {
        r.disconnected = true
        r.passes = false

        return r
      }

      let member: any = await getMember(r.id, accountData?.discord_access_token)
      if (!member.user) {
        const authData = await discordRefreshToken(accountData?.discord_refresh_token)

        if (authData.access_token) {
          await account.updateOne({
            wallet: wallet
          }, {
            $set: {
              discord_access_token: authData.access_token,
              discord_refresh_token: authData.refresh_token
            }
          })

          member = await getMember(r.id, authData.access_token)
        }
      }

      r.passes = !!member.user

      if (r.roles) {
        const intersections = intersectionBy(r.roles, (member.roles || []).map((m: string) => ({ id: m })), 'id')
        r.passes = intersections.length > 0
        if (r.passes) {
          r.entryRole = intersections.sort((a, b) => b.multiplier - a.multiplier)[0]
        }
      }
    }

    if (r.type === 'twitter_follow') {
      if (!accountData || !accountData?.twitter_oauth_token) {
        return r
      }

      const cachedTwitterFollow = cachedEntry.find(e => e.type === 'twitter_follow' && e.user === r.user)
      if (cachedTwitterFollow) {
        r.passes = true

        return r
      }

      if (r.user.replace('@', '').toLowerCase() === accountData?.twitter_username.toLowerCase()) {
        r.passes = true

        return r
      }

      if (!accountData?.twitter_oauth_token && accountData?.twitter_id) {
        r.disconnected = true
        r.passes = false
        return r
      }

      const token = {
        key: accountData?.twitter_oauth_token,
        secret: accountData?.twitter_oauth_token_secret
      }

      const getPage = async (nextToken: string) => {
        const twitterFollowUrl = `${process.env.TWITTER_API_URL}/users/${accountData?.twitter_id}/following?max_results=1000&user.fields=username${nextToken ? `&pagination_token=${nextToken}` : ''}`

        const authHeader = oauth.toHeader(oauth.authorize({
          url: twitterFollowUrl,
          method: 'GET'
        }, token))

        return await fetch(`${twitterFollowUrl}`, {
          headers: {
            Authorization: authHeader["Authorization"],
            'user-agent': "Likwid"
          }
        }).then(response => response.json())
          .catch((e) => {
            console.log(e.message)

            return { data: [] }
          })
      }

      let hasNextPage = true
      let nextToken = null

      while (hasNextPage && !r.passes) {
        let resp: any = await getPage(nextToken)
        if (resp && resp.meta && resp.meta.result_count && resp.meta.result_count > 0) {
          if (resp.data) {
            r.passes = !!(resp.data || []).find((d: any) => d.username.toLowerCase() === r.user.replace('@', '').toLowerCase())
          }
          if (resp.meta.next_token) {
            nextToken = resp.meta.next_token
          } else {
            hasNextPage = false
          }
        } else {
          hasNextPage = false
        }
      }

      // TODO: Get Twitter Elevated Access & Use this Method Instead
      // const twitterFollowUrl = `https://api.twitter.com/1.1/friendships/show.json?source_id=${twitterId}&target_screen_name=${r.user}`
      //
      // const authHeader = oauth.toHeader(oauth.authorize({
      //   url: twitterFollowUrl,
      //   method: 'GET'
      // }, token))
      //
      // const { relationship } = await fetch(twitterFollowUrl, {
      //   headers: {
      //     Authorization: authHeader["Authorization"],
      //     'user-agent': "Likwid"
      //   }
      // }).then(response => response.json())
      //   .catch((e) => {
      //     console.log(e.message)
      //
      //     return { relationship: {} }
      //   })
      //
      // // console.log('relationship', data)
      //
      // r.passes = relationship?.target?.following
    }

    if (r.type === 'twitter_like_retweet' || r.type === 'twitter_like' || r.type === 'twitter_retweet') {
      if (!accountData || !accountData?.twitter_oauth_token) {
        return r
      }

      const cachedTwitterRetweet = cachedEntry.find(e => (e.type === 'twitter_like_retweet' || e.type === 'twitter_retweet' || e.type === 'twitter_like') && e.id === r.id)
      if (cachedTwitterRetweet) {
        r.passes = true

        return r
      }

      const token = {
        key: accountData?.twitter_oauth_token,
        secret: accountData?.twitter_oauth_token_secret
      }

      if (!accountData?.twitter_oauth_token && accountData?.twitter_id) {
        r.disconnected = true
        r.passes = false
        return r
      }

      const endpointURL = `${process.env.TWITTER_API_URL}/users/${accountData?.twitter_id}/tweets?tweet.fields=referenced_tweets&max_results=100&exclude=replies&expansions=referenced_tweets.id`

      const authHeader = oauth.toHeader(oauth.authorize({
        url: endpointURL,
        method: 'GET'
      }, token))

      const {data: retweetData} = await fetch(endpointURL,
        {
          method: 'GET',
          headers: {
            Authorization: authHeader["Authorization"],
            'user-agent': "Likwid"
          }
        }
      ).then(response => response.json())
        .catch((e) => {
          console.log(e.message)

          return {data: []}
        })

      r.passes = !!(retweetData || []).find((d: any) => {
        return d.referenced_tweets?.find((t: any) => t.id === r.id)
      })
    }

    return r
  }))

  await redis.setex(`entry:${featureData._id.toString()}:${accountData?.wallet}`, 60, JSON.stringify(tasks.filter(f => f.passes)))

  const status = (tasks.length === 0 || tasks.filter(f => !f.passes).length === 0) ? 'SUCCESS' : 'ERROR'

  if (status === 'SUCCESS') {
    await featureEntry.insertOne({
      account_id: accountData?._id.toString(),
      feature_id: featureData._id.toString(),
      discord_id: accountData?.discord_id,
      discord_username: accountData?.discord_username,
      twitter_id: accountData?.twitter_id,
      twitter_username: accountData?.twitter_username,
      wallet: accountData?.wallet.toLowerCase(),
      entry_role: (tasks.find(r => r.type === 'discord') as TaskDiscord)?.entryRole,
      status: 'complete'
    })

    const finalTaskReward = featureData.exp * (!!tasks.find((f: any) => f.double_exp === true) ? 2 : 1)

    await account.updateOne({
      wallet
    }, {
      $inc: {
        exp: finalTaskReward
      }
    })
  }

  let message = status === 'SUCCESS' ? 'Registered' : 'One or more task incomplete, try again in couple minutes'
  const disconnectedSocial = tasks.find(f => f.disconnected)

  if (disconnectedSocial) {
    message = `Please reconnect your ${disconnectedSocial.type} account, and try again in couple minutes.`
  }

  return res.json({
    code: status === 'SUCCESS' ? 200 : 410,
    status,
    message,
    tasks,
    feature_id: featureId
  })
}

export default handleFeatureEntry