import Loading from '@/components/startbucks/loading';
import Nav from '@/components/startbucks/nav';
import { RouteChangeListener } from '@/components/startbucks/rotute-change-listener';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { soDoFont } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Starbucks Dubai',
  description: 'Starbucks Dubai',
};

export default function RootLayout({
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
      <body className="flex flex-col leading selection:bg-seagreen relative">
        <Suspense fallback={<Loading />}>
          <RouteChangeListener />
          <Nav />
          <main>{children}</main>
        </Suspense>
      </body>
    </html>
  );
}
