import {useAccount} from "wagmi";
import nProgress from "nprogress";

import Layout from "components/Layout";
import {Flex, Text} from "components/primitives";
import ProfileCard from 'components/profile/ProfileCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import {useFeatures, useProfile} from 'hooks';
import {useContext, useState} from "react";
import {ToastContext} from "../context/ToastContextProvider";
import {LikwidFeature} from "../types/common";
import FeatureItem from "../components/home/FeatureItem";

const HomePage = () => {
  const { address } = useAccount()
  const { data: profile, mutate, isLoading: isLoadingProfile } = useProfile(address)
  const { data: features, mutate: refetchFeatures, isLoading } = useFeatures()
  const { addToast } = useContext(ToastContext)

  console.log('features', features)

  const handleFeatureEntry =  async (featureId: string) => {
    nProgress.start();
    const response = await fetch('/api/feature/entry', {
      method: "POST",
      body: JSON.stringify({
        featureId: featureId,
        wallet: address
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
          {(features || []).map((f: LikwidFeature, i: number) => (
            <FeatureItem
              key={`raffle-${i}`}
              onFeatureEntry={handleFeatureEntry}
              data={f}
            />
          ))}
          {isLoading && (
            <Flex justify="center" align="center" css={{ minHeight: 300 }}>
              <LoadingSpinner />
            </Flex>
          )}
        </Flex>
      </Flex>
    </Layout>
  )
}

export default HomePage
