import { Router } from 'next/router'
import type { AppProps } from 'next/app'
import { globalReset } from 'stitches.config'
import {
  RainbowKitProvider,
  getDefaultWallets,
  darkTheme as rainbowDarkTheme,
} from '@rainbow-me/rainbowkit'
import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import {mainnet} from "wagmi/chains";
import {SessionProvider} from 'next-auth/react'
import * as Tooltip from '@radix-ui/react-tooltip'
import { publicProvider } from 'wagmi/providers/public'
import ToastContextProvider from 'context/ToastContextProvider'
import nProgress from 'nprogress'

import '@rainbow-me/rainbowkit/styles.css'
import 'nprogress/nprogress.css'

nProgress.configure({
  showSpinner: false,
})

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

const WALLET_CONNECT_PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_ID || ''

const { chains, publicClient } = configureChains(
  [mainnet],
  [
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Likwid',
  projectId: WALLET_CONNECT_PROJECT_ID,
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

function AppWrapper(props: AppProps) {
  const { session, ...appProps } = props;
  return (
    <WagmiConfig config={wagmiConfig}>
      <SessionProvider session={session}>
        <MyApp {...appProps} />
      </SessionProvider>
    </WagmiConfig>
  )
}

function MyApp({
 Component,
 pageProps,
}: AppProps) {
  globalReset()

  return (
    <Tooltip.Provider>
      <RainbowKitProvider
        chains={chains}
        theme={rainbowDarkTheme({
          borderRadius: 'small',
        })}
        modalSize="compact"
      >
        <ToastContextProvider>
          <Component {...pageProps} />
        </ToastContextProvider>
      </RainbowKitProvider>
    </Tooltip.Provider>
  )
}

export default AppWrapper
