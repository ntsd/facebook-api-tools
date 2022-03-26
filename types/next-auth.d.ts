import { Session } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    token: JWT
  }

  interface Profile {
    id: string
  }
}

declare module "next-auth/jwt" {
  // FACEBOOK Jwt Tokens
  interface JWT {
    id: string
    accessToken: string | undefined
    name: string
    email: string
    picture: string
    sub: string
    iat: number
    exp: number
    jti: string
  }
}
