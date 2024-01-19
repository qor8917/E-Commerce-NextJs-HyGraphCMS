'use client';

import useActionStore from '@/store/store-action';
import useProductStore from '@/store/store-product';
import { Transition } from '@headlessui/react';
import Image from 'next/image';

export default function FloorDrawerCart() {
  const { currentProduct } = useProductStore();
  const { isOpen } = useActionStore();
  return (
    <>
      {currentProduct?.images && (
        <Transition
          show={isOpen}
          enter="transition-opacity duration-1250"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-1250"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute bottom-[50px] left-[-8px] flex justify-center items-center">
            <div className="relative flex justify-center items-center w-[50px] h-[50px] bg-white rounded-[50%] after:content-[''] after:absolute after:left-0 after:right-0 after:m-auto after:w-0 after:h-0 after:top-[48px] after:border-t-[10px] after:border-solid after:border-white after:border-l-[10px] after:border-l-solid after:border-l-transparent after:border-r-[10px] after:border-r-solid after:border-r-transparent after:z-0">
              <div className=" rounded-[50%] overflow-hidden">
                <Image
                  alt={currentProduct?.images[0].fileName ?? '이미지없음'}
                  src={currentProduct?.images[0].url ?? '/drink_loading.png'}
                  width={40}
                  height={40}
                  placeholder="blur"
                  blurDataURL="/drink_loading.png"
                />
              </div>
            </div>
          </div>
        </Transition>
      )}
    </>
  );
}
