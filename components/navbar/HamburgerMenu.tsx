import * as RadixDialog from '@radix-ui/react-dialog'
import {
  faBars,
  faXmark
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {signOut} from "next-auth/react";
import {useAccount, useDisconnect} from "wagmi";
import Link from 'next/link'
import Image from "next/image"

import {Box, Button, Flex, Text} from '../primitives'
import ConnectWalletButton from '../common/ConnectWalletButton'
import {FullscreenModal} from './FullscreenModal'
import {useENSResolver, useProfile} from 'hooks'

const HamburgerMenu = () => {
  const {
    address,
    isConnected,
  } = useAccount({
    onDisconnect: async () => {
      await signOut({ callbackUrl: '/' });
    }
  })
  const {
    avatar: ensAvatar,
    shortAddress,
    shortName: shortEnsName,
  } = useENSResolver(address)
  const {disconnect} = useDisconnect()
  const { data: profile } = useProfile(address)

  const trigger = (
    <Button
      css={{justifyContent: 'center', width: '44px', height: '44px', mr: 8 }}
      type="button"
      size="sm"
      color="white"
    >
      <FontAwesomeIcon icon={faBars} width={16} height={16}/>
    </Button>
  )

  return (
    <FullscreenModal trigger={trigger}>
      <Flex
        css={{
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Flex
          css={{
            px: '$4',
            py: '$3',
            width: '100%',
            borderBottom: '1px solid $gray4',
          }}
          align="center"
          justify="between"
        >
          <Link href="/" legacyBehavior>
            <Flex align="center" css={{ gap: 10, cursor: 'pointer' }}>
              <Image
                src="/images/likwid-icon.svg"
                width={50}
                height={50}
                alt="Likwid"
                style={{
                  borderRadius: 30
                }}
              />
              <Text css={{ fontSize: 18 }} bolder>Likwid</Text>
            </Flex>
          </Link>
          <RadixDialog.Close>
            <Flex
              css={{
                justifyContent: 'center',
                width: '44px',
                height: '44px',
                alignItems: 'center',
                borderRadius: 8,
                backgroundColor: '#fff',
                color: '$gray12',
                '&:hover': {
                  backgroundColor: '$gray4',
                },
              }}
            >
              <FontAwesomeIcon icon={faXmark} width={16} height={16}/>
            </Flex>
          </RadixDialog.Close>
        </Flex>
        <Flex
          css={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            height: '100%',
            px: 16,
          }}
        >
          {(isConnected && profile) ? (
            <>
              <Flex direction="column" css={{ py: 24 }}>
                <Link href={`/profile`} legacyBehavior>
                  <Text
                    style="body2"
                    css={{
                      borderBottom: '1px solid $gray4',
                      cursor: 'pointer',
                      mb: 8,
                      py: 12,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    Profile
                  </Text>
                </Link>
                <Text
                  style="body2"
                  onClick={() => disconnect()}
                  css={{
                    cursor: 'pointer',
                    mt: 8,
                    py: 12,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  Log out
                </Text>
              </Flex>
            </>
          ) : (
            <Box>
              <ConnectWalletButton/>
            </Box>
          )}
        </Flex>
      </Flex>
    </FullscreenModal>
  )
}

export default HamburgerMenu
