'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ButtonSignOut() {
  const route = useRouter();
  const { data: session, status } = useSession();
  return (
    <>
      {status == 'unauthenticated' ? (
        <Link
          href="/account/signin"
          className="block rounded-[3.125rem] border border-solid px-4 py-2 text-center hover:bg-gray-100 "
        >
          Sign in
        </Link>
      ) : (
        <button
          className="block rounded-[3.125rem] border border-solid px-4 py-2 text-center hover:bg-gray-100 "
          onClick={async () => {
            const a = await signOut({ redirect: false, callbackUrl: '/' });
            route.push(a.url);
          }}
        >
          Sign out
        </button>
      )}
    </>
  );
}
