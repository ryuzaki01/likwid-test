import { Session } from 'next-auth';
import { AppProps as DefaultAppProps } from 'next/app';

declare module "next/app" {
  export type AppProps = {
    session?: Session
  } & DefaultAppProps
}
