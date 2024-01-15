import NextAuth, {NextAuthOptions} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import {getAddress} from "viem";
import db from "lib/db";

const user = db.collection('account');

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        wallet: {
          label: 'Wallet',
          type: 'text',
          placeholder: '0x0',
        },
      },
      authorize(credentials, req) {
        if (!getAddress(credentials?.wallet || '')) {
          return null
        }

        return new Promise(async (resolve, reject) => {
          let userData = await user.findOne({
            wallet: credentials?.wallet
          })

          if (!userData) {
            const record = await user.insertOne({
              wallet: credentials?.wallet
            })

            userData = {
              _id: record.insertedId,
            }
          }

          user.updateOne({
            _id: userData._id
          }, {
            $set: {
              lastLogin: (new Date()).getTime() / 1000
            }
          })

          resolve({
            id: credentials?.wallet || '',
          })
        })
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async session({ session, token }) {
      session.wallet = token.sub

      if (session.wallet) {
        // Dont wait for function to complete
        user.updateOne({
          wallet: session.wallet
        }, {
          $set: {
            lastActivity: (new Date()).getTime() / 1000
          }
        })
      }

      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
    signOut: '/',
    error: '/',
    newUser: '/',
  },
};

export default NextAuth(authOptions);