import Loading from '@/components/startbucks/loading';
import Nav from '@/components/startbucks/nav';
import PushMessageListener from '@/components/startbucks/push-message-listener';
import { RouteChangeListener } from '@/components/startbucks/rotute-change-listener';
import SessionWrapper from '@/components/startbucks/session-provider';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { soDoFont } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
  title: 'Starbucks Clone Dubai',
  description: 'Starbucks Site clone by Seong',
  robots: {
    follow: true,
    index: true,
  },
};
const GTM_ID = 'GTM-KKCNWF4Q';
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={soDoFont.className}>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href="/icons/apple-icon-192x192.png"
        ></link>
        <link
          rel="icon"
          sizes="512x512"
          href="/icons/apple-icon-512x512.png"
        ></link>
        <link rel="manifest" href="/manifest.json"></link>
        <meta name="msapplication-TileColor" content="#ffffff"></meta>
        <meta
          name="msapplication-TileImage"
          content="/icons/apple-icon-192x192.png"
        ></meta>
        <meta name="theme-color" content="#ffffff"></meta>
        <meta
          name="google-site-verification"
          content="2yOD2LyuAg_i7c1GdvNEiNrJBEGhStb1Epwn2Wc0EOQ"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta property="og:url" content="https://starbucksdubai.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Starbucks Clone Dubai" />
        <meta property="og:description" content="" />
        <meta
          property="og:image"
          content="https://starbucksdubai.vercel.app/logo_starbucks.svg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="starbucksdubai.vercel.app" />
        <meta
          property="twitter:url"
          content="https://starbucksdubai.vercel.app/"
        />
        <meta name="twitter:title" content="Starbucks Clone Dubai" />
        <meta name="twitter:description" content="" />
        <meta
          name="twitter:image"
          content="https://starbucksdubai.vercel.app/logo_starbucks.svg"
        />
      </head>

      <SessionWrapper>
        <body className="flex flex-col leading selection:bg-seagreen relative">
          <Suspense fallback={<Loading />}>
            <RouteChangeListener />
            <PushMessageListener />
            <Nav />
            <main>{children}</main>
          </Suspense>
        </body>
      </SessionWrapper>
    </html>
  );
}
