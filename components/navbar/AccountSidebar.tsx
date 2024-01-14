import { FC, useEffect, useState } from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import {useENSResolver, useProfile} from 'hooks'
import Jazzicon from 'react-jazzicon/dist/Jazzicon'
import { jsNumberForAddress } from 'react-jazzicon'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faClose,
  faCopy,
  faGear,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {signOut} from "next-auth/react";

import { Box, Button, Flex, Text, Avatar } from 'components/primitives'
import { AnimatedOverlay, Content } from 'components/primitives/Dialog'
import CopyText from 'components/common/CopyText'
import {formatNumber} from "utils/numbers";

export const AccountSidebar: FC = () => {
  const { address } = useAccount({
    onDisconnect: async () => {
      await signOut({ callbackUrl: '/' });
    }
  })
  const { disconnect } = useDisconnect()
  const router = useRouter()
  const {
    avatar: ensAvatar,
    shortAddress,
    shortName: shortEnsName,
  } = useENSResolver(address)
  const [open, setOpen] = useState(false)
  const { data: profile } = useProfile(address)

  useEffect(() => {
    setOpen(false)
  }, [router.asPath])

  const trigger = (
    <Button
      css={{
        justifyContent: 'center',
      }}
      corners="circle"
      type="button"
      size="none"
      color="gray3"
    >
      {profile?.avatar ? (
        <img src={profile?.avatar} style={{ width: 40, height: 40, borderRadius: '50%' }} />
      ) : (ensAvatar ? (
        <Avatar size="medium" src={ensAvatar} />
      ) : (
        <Jazzicon diameter={40} seed={jsNumberForAddress(address as string)} />
      ))}
    </Button>
  )

  return (
    <DialogPrimitive.Root onOpenChange={setOpen} open={open}>
      {trigger && (
        <DialogPrimitive.DialogTrigger asChild>
          {trigger}
        </DialogPrimitive.DialogTrigger>
      )}
      <AnimatePresence>
        {open && (
          <DialogPrimitive.DialogPortal forceMount>
            <AnimatedOverlay
              css={{ backgroundColor: '$sidebarOverlay' }}
              style={{ opacity: 0.6 }}
            />
            <Content
              forceMount
              asChild
              css={{
                right: 0,
                top: 0,
                bottom: 0,
                transform: 'none',
                left: 'unset',
                width: 395,
                maxWidth: 395,
                minWidth: 395,
                maxHeight: '100vh',
                background: '$gray1',
                border: 0,
                borderRadius: 0,
              }}
            >
              <motion.div
                transition={{ type: 'tween', duration: 0.4 }}
                initial={{
                  opacity: 0,
                  right: '-100%',
                }}
                animate={{
                  opacity: 1,
                  right: 0,
                }}
                exit={{
                  opacity: 0,
                  right: '-100%',
                }}
              >
                <Flex direction="column" css={{ py: 42, px: '$4' }}>
                  <Button
                    color="ghost"
                    css={{ color: '$gray10', ml: 'auto', mr: 10 }}
                    onClick={() => {
                      setOpen(false)
                    }}
                  >
                    <FontAwesomeIcon icon={faClose} height={16} width={16} />
                  </Button>
                  <Flex align="center" css={{ gap: '$3', ml: '$3' }}>
                    {profile?.avatar ? (
                      <img src={profile?.avatar} style={{ width: 44, height: 44, borderRadius: '50%' }} />
                    ) : (ensAvatar ? (
                      <Avatar size="medium" src={ensAvatar} />
                    ) : (
                      <Jazzicon diameter={44} seed={jsNumberForAddress(address as string)} />
                    ))}
                    <Flex direction="column">
                      <CopyText
                        text={address || ''}
                        css={{ width: 'max-content' }}
                      >
                        <Flex
                          align="center"
                          css={{
                            gap: 10,
                            color: '$gray11',
                            cursor: 'pointer',
                          }}
                        >
                          <Text style="body1">
                            {profile?.username ||  shortEnsName || shortAddress}
                          </Text>
                          {!profile?.username && !shortEnsName ? (
                            <FontAwesomeIcon
                              icon={faCopy}
                              width={16}
                              height={16}
                            />
                          ) : null}
                        </Flex>
                      </CopyText>
                      {(shortEnsName || profile?.username) ? (
                        <Flex
                          align="center"
                          css={{
                            gap: 10,
                            color: '$gray11',
                            cursor: 'pointer',
                          }}
                        >
                          <Text style="body2" color="subtle">
                            {shortAddress}
                          </Text>
                          <FontAwesomeIcon
                            icon={faCopy}
                            width={16}
                            height={16}
                          />
                        </Flex>
                      ) : null}
                    </Flex>
                  </Flex>
                  <Flex direction="column" align="center" css={{ mt: '$5'}}>
                    <Text style="h5" color="subtle" boldest css={{ mb: '$2' }}>
                      Total XP
                    </Text>
                    <Text style="h5" css={{ mb: '$4' }} boldest>{formatNumber(profile?.exp || 0)}</Text>
                  </Flex>
                  <Link href="/profile">
                    <Flex
                      align="center"
                      css={{
                        gap: 6,
                        p: '$3',
                        color: '$gray10',
                        cursor: 'pointer',
                      }}
                    >
                      <FontAwesomeIcon icon={faGear} width={16} height={16} />
                      <Text style="body1">Edit Profile</Text>
                    </Flex>
                  </Link>
                  <Flex
                    justify="between"
                    align="center"
                    css={{
                      cursor: 'pointer',
                      px: '$4',
                      my: '$3',
                    }}
                    onClick={() => disconnect()}
                  >
                    <Text style="body1">Logout</Text>
                    <Box css={{ color: '$gray10' }}>
                      <FontAwesomeIcon
                        icon={faRightFromBracket}
                        width={16}
                        height={16}
                      />
                    </Box>
                  </Flex>
                </Flex>
              </motion.div>
            </Content>
          </DialogPrimitive.DialogPortal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  )
}
