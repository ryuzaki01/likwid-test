import { DefaultSession } from "next-auth"
import { GithubProfile } from 'next-auth/providers/github';

declare module "next-auth" {
  interface Session {
    wallet?: string | null
  }
}
