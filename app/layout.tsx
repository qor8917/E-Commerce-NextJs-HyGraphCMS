import Loading from '@/components/startbucks/loading';
import Nav from '@/components/startbucks/nav';
import PushMessageListener from '@/components/startbucks/push-message-listener';
import { RouteChangeListener } from '@/components/startbucks/rotute-change-listener';
import SessionWrapper from '@/components/startbucks/session-provider';
import type { Metadata } from 'next';
import Script from 'next/script';
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
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>
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
      <SessionWrapper>
        <body className="flex flex-col leading selection:bg-seagreen relative">
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display: none; visibility: hidden;"></iframe>`,
            }}
          />
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
