import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { LoginRedirect } from '../components/LoginRedirect'
import { Layout } from '../components/Layout'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import React from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export default function App({
  Component,
  pageProps,
}: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <LoginRedirect>
            <Component {...pageProps} />
          </LoginRedirect>
        </Layout>
      </QueryClientProvider>
    </SessionProvider>
  )
}
