'use client';
import useActionStore from '@/store/store-action';
import useProductStore from '@/store/store-product';
import { Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment, useEffect } from 'react';

export default function ActiveAddToCart() {
  const { isOpen, handleIsOpen } = useActionStore();
  const { currentProduct } = useProductStore();
  useEffect(() => {
    handleIsOpen(false);
  }, []);
  return (
    <Transition
      show={isOpen}
      as={Fragment}
      enter="transition-all ease-in-out duration-500"
      enterFrom="translate-y-full"
      enterTo="translate-y-0"
      leave="transition-all ease-in-out duration-500"
      leaveFrom="translate-y-0"
      leaveTo="translate-y-full"
    >
      <div className="fixed w-full bottom-[74px] left-0 right-0 z-10 ">
        <div className="flex h-16 items-center justify-between bg-seagreen p-4 opacity-90 text-white ">
          <h2 className="px-32 max-xl:px-12 max-lg:px-5">
            {currentProduct?.name} &nbsp;added.
          </h2>
          <div
            onClick={() => {
              handleIsOpen(false);
            }}
          >
            <Image src="/close.svg" alt="close" width={16} height={16} />
          </div>
        </div>
      </div>
    </Transition>
  );
}
