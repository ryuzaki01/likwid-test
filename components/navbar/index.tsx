import { useRouter } from 'next/router'
import { useMediaQuery } from 'react-responsive'
import { useAccount } from 'wagmi'
import Image from "next/legacy/image"
import Link from 'next/link'

import { Box, Flex, Text } from '../primitives'
import HamburgerMenu from './HamburgerMenu'
import ConnectWalletButton from 'components/common/ConnectWalletButton'
import { AccountSidebar } from 'components/navbar/AccountSidebar'
import {useMounted, useProfile} from 'hooks'
import {formatNumber} from "utils/numbers";

export const NAVBAR_HEIGHT = 81
export const NAVBAR_HEIGHT_MOBILE = 77

const Navbar = () => {
  const {
    address,
    isConnected,
  } = useAccount()
  const { data: profile } = useProfile(address)
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })
  const isMounted = useMounted()

  const router = useRouter()
  if (!isMounted) {
    return null
  }

  return isMobile ? (
    <Flex
      css={{
        height: NAVBAR_HEIGHT_MOBILE,
        px: '$4',
        width: '100%',
        borderBottom: '1px solid $gray4',
        zIndex: 999,
        background: '$slate1',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
      }}
      align="center"
      justify="between"
    >
      <Box css={{ flex: 1 }}>
        <Flex align="center">
          <Link href={`/`}>
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
        </Flex>
      </Box>
      <Flex align="center" css={{ gap: '$3' }}>
        <HamburgerMenu key={`${router.asPath}-hamburger`} />
      </Flex>
    </Flex>
  ) : (
    <Flex
      css={{
        height: NAVBAR_HEIGHT,
        px: '$5',
        width: '100%',
        maxWidth: 1920,
        mx: 'auto',
        borderBottom: '1px solid $gray4',
        zIndex: 999,
        background: '$neutralBg',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
      }}
      align="center"
      justify="between"
    >
      <Flex align="center" justify="between" css={{ flex: 1 }}>
        <Flex align="center" css={{ flex: 1 }}>
          <Link href={`/`}>
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
        </Flex>
      </Flex>

      <Flex css={{ gap: '$5' }} justify="end" align="center">
        <Text style="h6" boldest>{`Exp : ${formatNumber(profile?.exp)}`}</Text>
        {isConnected ? (
          <AccountSidebar />
        ) : (
          <Box css={{ maxWidth: '185px' }}>
            <ConnectWalletButton />
          </Box>
        )}
      </Flex>
    </Flex>
  )
}

export default Navbar
