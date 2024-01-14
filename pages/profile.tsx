import {useEffect, useState} from 'react'
import {useSession} from "next-auth/react";
import {signIn} from "next-auth/react";
import {useSignMessage} from "wagmi"
import {recoverMessageAddress} from "viem";
import {AuthOptions, getServerSession} from "next-auth";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage
} from "next";

import {Text, Flex, Box, Button} from 'components/primitives'
import Layout from 'components/Layout'
import ProfileDetail from 'components/profile/ProfileDetail'
import LoadingSpinner from "components/common/LoadingSpinner";
import {useProfile} from "hooks";
import {authOptions} from "./api/auth/[...nextauth]";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const PortfolioSettings : NextPage<Props> = ({ ssr }) => {
  const { data: session, update } = useSession()
  const { data: signMessageData, error, isLoading: isLoadingSignature, signMessage, variables } = useSignMessage()

  const {
    data: profile,
    isLoading,
    isValidating,
  } = useProfile(
    session?.wallet || '0x0',
    {
      revalidateOnMount: false,
      fallbackData: ssr.profile,
      revalidateIfStale: false,
    }
  )

  useEffect(() => {
    (async () => {
      if (variables?.message && signMessageData) {
        const recoveredAddress = await recoverMessageAddress({
          message: variables?.message,
          signature: signMessageData,
        })

        await signIn('credentials', { redirect: false, wallet: recoveredAddress } );
        await update();
      }
    })()
  }, [signMessageData, variables?.message])

  useEffect(() => {
    if (!session) {
      signMessage({ message: 'Likwid wants you to sign in with your Ethereum account' })
    }
  }, [session])

  if (isLoadingSignature || isLoadingSignature) {
    return (
      <Layout>
        <Flex align="center" justify="center" css={{ py: '40vh' }}>
          <LoadingSpinner />
        </Flex>
      </Layout>
    )
  }

  if (!profile) {
    return (
      <Layout>
        <Flex direction="column" align="center" justify="center" css={{ py: '40vh', gap: 20 }}>
          <Text>Sign this message to prove your ownership of this wallet </Text>
          <Button onClick={() => {
            signMessage({ message: 'Likwid wants you to sign in with your Ethereum account' })
          }}>Sign</Button>
        </Flex>
      </Layout>
    )
  }

  return (
    <Layout>
      <Box
        css={{
          p: 24,
          height: '100%',
          '@bp800': {
            p: '$5',
          },
        }}>
        <ProfileDetail
          profile={profile}
        />
      </Box>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<{
  ssr: {
    profile?: any
  }
}> = async ({ req, res }) => {
  const session: any = await getServerSession(
    req,
    res,
    authOptions as AuthOptions
  )

  const profile = session ? await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/profile?address=${session.wallet}`)
    .then(res => res.json())
    .catch(() => null) : null

  return {
    props: { ssr: { profile } }
  }
}

export default PortfolioSettings
