import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { LoginRedirect } from '../components/LoginRedirect'
import { Layout } from '../components/Layout'

export default function App({
  Component,
  pageProps,
}: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <LoginRedirect>
          <Component {...pageProps} />
        </LoginRedirect>
      </Layout>
    </SessionProvider>
  )
}
