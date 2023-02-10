import { Header } from '@/components/header'
import type { AppProps } from 'next/app'
import './styles/global.scss'
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth";

export default function App({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Header />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}
