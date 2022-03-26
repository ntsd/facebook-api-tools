import { useSession } from "next-auth/react"
import React from "react"
import { LoginBox } from "./LoginBox"

export const LoginRedirect: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session } = useSession()

  if (!session) {
    return (
      <LoginBox/>
    )
  }

  return (
    <>
      {children}
    </>
  )
}
