'use client';
import { Transition } from '@headlessui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ButtonOrder() {
  const [active, setActive] = useState(false);
  useEffect(() => {
    setActive(true);
  }, []);
  return (
    <Transition
      show={active}
      enter="transition-opacity duration-1000"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-1000"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="inline-flex translate-y-6  items-center justify-center rounded-full bg-emerald-700 px-6 py-4 shadow"
    >
      <Link
        href="/menu"
        className="text-lg h-6 w-32 cursor-pointer text-center font-sodo-sans font-semibold leading-snug tracking-wider text-white "
      >
        Start an order
      </Link>
    </Transition>
  );
}
