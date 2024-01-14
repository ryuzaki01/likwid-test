declare export type TaskEntryRole = {
  id: string
  name: string
  multiplier: number
}

declare export type TaskProfile = {
  type: 'profile'
  name: string
  passes?: boolean
  disconnected?: boolean
}

declare export type TaskConnection = {
  type: 'connection'
  name: string
  passes?: boolean
  disconnected?: boolean
}

declare export type TaskDiscord = {
  type: 'discord'
  id: string
  name: string
  url: string
  roles?: TaskEntryRole[]
  entryRole?: TaskEntryRole
  passes?: boolean
  disconnected?: boolean
}

declare export type TaskTwitterFollow =  {
  type: 'twitter_follow'
  user: string
  passes?: boolean
  disconnected?: boolean
}

declare export type TaskTwitterLike =  {
  type: 'twitter_like'
  id: string
  url: string
  passes?: boolean
  disconnected?: boolean
}

declare export type TaskTwitterRetweet =  {
  type: 'twitter_retweet'
  id: string
  url: string
  passes?: boolean
  disconnected?: boolean
}

declare export type TaskTwitterLikeRetweet = {
  type: 'twitter_like_retweet'
  id: string
  url: string
  passes?: boolean
  disconnected?: boolean
}

declare export type FeatureTask = TaskProfile | TaskConnection | TaskDiscord |
  TaskTwitterFollow | TaskTwitterRetweet | TaskTwitterLike | TaskTwitterLikeRetweet

declare export type LikwidFeature = {
  id: string
  title: string
  description: string
  exp: number
  tasks: FeatureTask[]
  entry?: any
}
