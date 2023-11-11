import type { Metadata } from 'next'
import Head from 'next/head'
import Script from 'next/script'
import { Roboto } from 'next/font/google'
import './globals.css'
import Providers from './context/Providers'
import Header from './components/Header'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const roboto = Roboto({
  weight: ['100', '300', '400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mio Zio',
  openGraph: {
    title: 'Mio Zio',
    description: 'Always fresh, always delicious',
    url: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}`,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className='scroll-smooth'>
      <Head>
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <body className={`text-dark dark:text-light ${roboto.className}`}>
        <Providers>
          <Header />
          {/* fixed header with h-24 */}
          <main className='mt-24'>{children}</main>
          <ToastContainer position='bottom-right' />
          <Footer />
        </Providers>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-S76TYPBYJQ`}
        />
        <Script id='google-analytics'>
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-S76TYPBYJQ');
        `}
        </Script>
      </body>
    </html>
  )
}
