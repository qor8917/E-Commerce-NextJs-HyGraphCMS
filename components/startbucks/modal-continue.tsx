'use client';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';

export default function ContinueModal() {
  const [active, setActive] = useState(false);
  const openContinue = () => setActive(true);
  const closeContinue = () => setActive(false);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (!isShow) {
      setIsShow(true);
    }
  }, [isShow]);
  return (
    <Transition
      show={isShow}
      enter="transition-opacity duration-1000"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-1000"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <>
        <button
          onClick={openContinue}
          className="text-lg w-30 fixed bottom-12 right-10 flex  h-8 cursor-pointer items-center justify-center rounded-full bg-emerald-700 px-6 py-8 text-center font-sodo-sans font-semibold leading-snug  tracking-wider text-white shadow max-md:right-4 "
        >
          Countinue
        </button>
        <Transition show={active}>
          <Dialog onClose={closeContinue} as="div" className="relative z-10">
            <Transition.Child
              as={Fragment}
              enter="transition-all ease-in-out duration-300"
              enterFrom="opacity-0 backdrop-blur-none"
              enterTo="opacity-100 backdrop-blur-[.5px]"
              leave="transition-all ease-in-out duration-200"
              leaveFrom="opacity-100 backdrop-blur-[.5px]"
              leaveTo="opacity-0 backdrop-blur-none"
            >
              <div className="fixed inset-0 bg-black/30" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition-all ease-in-out duration-300"
              enterFrom="translate-y-full"
              enterTo="translate-y-0"
              leave="transition-all ease-in-out duration-200"
              leaveFrom="translate-y-0"
              leaveTo="translate-y-full"
            >
              <Dialog.Panel className="fixed bottom-0 left-0 right-0 h-[30%] w-screen bg-white p-4 text-black">
                <div className="w-full">
                  <Image src="/close.svg" width={32} height={32} alt="close" />
                </div>
                <div className="flex flex-col items-center justify-center gap-y-6">
                  <div>
                    To place an order, you&apos;ll need to be a Starbucks®
                    Rewards member
                  </div>
                  <Link href="/register" className="text-2xl text-seagreen">
                    Join now
                  </Link>
                  <Link href="/login" className="text-2xl text-seagreen">
                    Sign in
                  </Link>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </Dialog>
        </Transition>
      </>
    </Transition>
  );
}
