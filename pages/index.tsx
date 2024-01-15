import {useContext, useEffect} from "react";
import {useAccount, useSignMessage} from "wagmi";
import nProgress from "nprogress";

import Layout from "components/Layout";
import {Flex, Text} from "components/primitives";
import ProfileCard from 'components/profile/ProfileCard';
import LoadingSpinner from 'components/common/LoadingSpinner';
import {ToastContext} from "context/ToastContextProvider";
import FeatureItem from "components/home/FeatureItem";
import {useFeatures, useProfile} from 'hooks';
import {LikwidFeature} from "types/common";
import {recoverMessageAddress} from "viem";
import {signIn, useSession} from "next-auth/react";

const Home = () => {
  const { address } = useAccount()
  const { data: profile, mutate, isLoading: isLoadingProfile } = useProfile(address)
  const { data: features, mutate: refetchFeatures, isLoading } = useFeatures()
  const {data: signMessageData, error, isLoading: isLoadingSignature, signMessage, variables} = useSignMessage()
  const {data: session, update} = useSession()
  const { addToast } = useContext(ToastContext)

  useEffect(() => {
    (async () => {
      if (variables?.message && signMessageData) {
        const recoveredAddress = await recoverMessageAddress({
          message: variables?.message,
          signature: signMessageData,
        })

        await signIn('credentials', {redirect: false, wallet: recoveredAddress});
        await update();
      }
    })()
  }, [signMessageData, variables?.message])

  const handleFeatureEntry =  async (featureId: string) => {
    nProgress.start();

    if (!session?.wallet) {
      signMessage({message: 'Likwid wants you to sign in with your Ethereum account'})
      return;
    }

    const response = await fetch('/api/feature/entry', {
      method: "POST",
      body: JSON.stringify({
        featureId: featureId,
        wallet: session?.wallet
      })
    }).then(res => res.json())
      .catch(e => {
        return {
          status: 'ERROR',
          message: e.message
        }
      });

    if (response.status === 'ERROR') {
      addToast?.({
        status: 'error',
        title: 'Error',
        description: response.message
      })
    } else {
      addToast?.({
        status: 'success',
        title: 'Success',
        description: response.message
      })
    }

    refetchFeatures();
    mutate();
    nProgress.done();
  }

  return (
    <Layout>
      <Flex
        css={{
          flexDirection: 'column',
          maxWidth: 1280,
          mx: 'auto',
          pt: 24,
          pb: 64,
          gap: 32,
          '@lg': {
            flexDirection: 'row',
            gap: 32,
            px: 32,
          },
        }}
      >
        <ProfileCard
          profile={profile}
          isLoading={isLoadingProfile || !profile}
        />
        <Flex
          css={{
            backgroundColor: '$neutralBg',
            border: '1px solid $gray100',
            borderRadius: '$lg',
            p: 24,
            gap: 24,
            flex: 1,
          }}
          direction="column"
        >
          <Flex css={{ gap: 12 }} align="center">
            <Text style="h5" boldest>Features</Text>
          </Flex>
          {(isLoading || isLoadingSignature) ? (
            <Flex justify="center" align="center" css={{ minHeight: 300 }}>
              <LoadingSpinner />
            </Flex>
          ) : (features || []).map((f: LikwidFeature, i: number) => (
            <FeatureItem
              key={`raffle-${i}`}
              onFeatureEntry={handleFeatureEntry}
              data={f}
            />
          ))}
        </Flex>
      </Flex>
    </Layout>
  )
}

export default Home
