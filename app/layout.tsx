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
  title: 'Starbucks Dubai',
  description: 'Starbucks Site clone by Seong',
  robots: {
    follow: true,
    index: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={soDoFont.className}>
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
