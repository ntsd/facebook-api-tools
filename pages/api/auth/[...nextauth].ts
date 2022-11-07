import NextAuth, { NextAuthOptions } from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"

export const authOptions: NextAuthOptions = {
  debug: true,
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID || '',
      clientSecret: process.env.FACEBOOK_SECRET || '',
      authorization: "https://www.facebook.com/v11.0/dialog/oauth?scope=email,user_likes,read_insights,pages_manage_engagement",
    }),
  ],
  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a separate secret is defined explicitly for encrypting the JWT.
  secret: process.env.SECRET,
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (token) {
        if (account && account.access_token) {
          token.accessToken = account.access_token
        }
        if (profile) {
          token.id = profile.id
        }
      }
      return token
    },
    async session({ session, token }) {
      return { ...session, token }
    },
  },
}

export default NextAuth(authOptions)
