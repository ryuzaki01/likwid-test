import { Avatar, Flex, Text, Skeleton } from '../primitives';
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faXTwitter, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMounted } from 'hooks';
import { useMediaQuery } from 'react-responsive';
import {truncateAddress, truncateStr} from "utils/truncate";
import Link from "next/link";

export type Profile = {
  username: string
  avatar: string
  bio: string
  website: string
  wallet: string
  address: string
  twitter_username: string
  discord_username: string
}

type ProfileCardProps = {
  profile: Profile,
  isLoading: boolean
}

const ProfileCard = (props: ProfileCardProps) => {
  const { profile, isLoading } = props;
  const isMounted = useMounted()
  const isSmallDevice = useMediaQuery({ maxWidth: 600 }) && isMounted

  return (
    <Flex
      direction="column"
      css={{
        p: 24,
        gap: 24,
        '@lg': {
          width: 350
        }
      }}
    >
      <Flex
        align="center"
        css={{
          flexDirection: 'row',
          gap: 16,
          '@lg': {
            gap: 8,
            flexDirection: 'column'
          }
        }}
      >
        <Avatar fallback="..." size={isSmallDevice ? 'xxxl' : 'xxxxl'} src={profile?.avatar || 'https://placehold.co/160x160?text=...'}/>
        <Flex
          direction="column"
          css={{
            flex: 1,
            gap: 2,
            width: '100%'
          }}
        >
          {isLoading ? (
            <>
              <Skeleton variant="title" css={{ width: '100%' }} />
              <Skeleton variant="heading" css={{ width: '100%' }} />
            </>
          ) : (
            <>
              <Text style="h5" boldest css={{ '@lg': { textAlign: 'center' } }}>{profile?.username}</Text>
              <Text css={{ '@lg': { textAlign: 'center' } }}>{truncateAddress(profile?.wallet || '-')}</Text>
            </>
          )}
        </Flex>
      </Flex>
      <Flex
        direction="column"
        css={{
          gap: 16
        }}
      >
        <Flex
          direction="column"
          css={{
            gap: 8
          }}
        >
          <Text style="body1" boldest>About</Text>
          <Text style="body2">{profile?.bio || '-'}</Text>
        </Flex>
        <Flex
          direction="column"
          css={{
            gap: 8
          }}
        >
          <Flex
            css={{
              gap: 8
            }}
          >
            <FontAwesomeIcon icon={faGlobe} style={{ width: 20, height: 20 }} color="#344054" />
            {isLoading ?
              <Skeleton variant="heading" css={{ width: 'calc(100% - 28px)' }} /> :
              <Text as={Link} href={profile?.website || '#'} target="_blank" style="body2" css={{ mb: 8, wordBreak: 'break-all' }}>{truncateStr(profile?.website) || '-'}</Text>
            }
          </Flex>
          <Flex
            css={{
              gap: 8
            }}
          >
            <FontAwesomeIcon icon={faDiscord} style={{ width: 20, height: 20 }} color="#344054" />
            {isLoading ? (
              <Skeleton variant="heading" css={{ width: '100%' }} />
            ) : (
              <Text style="body1" boldest css={{ mr: 4 }}>{`#${profile?.discord_username || '-'}`}</Text>
            )}
          </Flex>
          <Flex
            css={{
              gap: 8
            }}
          >
            <FontAwesomeIcon icon={faXTwitter} style={{ width: 20, height: 20 }} color="#344054" />
            {isLoading ? (
              <Skeleton variant="heading" css={{ width: '100%' }} />
            ) : (
              <Text style="body1" boldest css={{ mr: 4 }}>{`@${profile?.twitter_username || '-'}`}</Text>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ProfileCard;
