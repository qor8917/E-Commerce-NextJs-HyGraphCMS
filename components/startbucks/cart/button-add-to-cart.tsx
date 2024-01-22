'use client';
import useActionStore from '@/store/store-action';
import useCartStore from '@/store/store-cart';
import useProductStore from '@/store/store-product';
import { Product } from '@/types/types';
import { Transition } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function ButtonAddToCart({
  product,
  options,
}: {
  product: Product;
  options: Record<string, string | number>[] | null;
}) {
  useEffect(() => {
    setActive(true);
    setCurrentProduct(product);
  }, []);
  const [active, setActive] = useState(false);
  const { setCurrentProduct } = useProductStore();

  const payload = { product, selectedOptions: options };
  // const [addItemState, addItemFortState] = useFormState(addItem, null);
  // const addItemFortStateWithVariants = addItemFortState.bind(null, payload);

  return (
    <Transition
      show={active}
      enter="transition-opacity duration-1000"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-1000"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {/* <form action={addItemFortStateWithVariants} className="block"> */}
      <div className="block">
        <SubmitButton payload={payload} />
        {/* <p aria-live="polite" className="sr-only" role="status">
          {addItemState}
        </p> */}
      </div>
    </Transition>
  );
}
function SubmitButton({ payload }: { payload: any }) {
  const { isOpen, handleIsOpen } = useActionStore();
  const { addCurrentCartItem } = useCartStore();
  const addNewItem = () => {
    const { product, selectedOptions } = payload;

    const [size, ...rest] = selectedOptions;
    console.log(rest);
    const amount = selectedOptions.reduce((acc: any, option: any) => {
      acc += option.price as number;
      return acc;
    }, 0);
    const line = {
      id: uuidv4(),
      quantity: 1,
      cost: { amount: amount, currencyCode: 'krw' },
      merchandise: {
        selectedOptions: rest,
        selectedSize: size,
        product: product,
      },
    };
    addCurrentCartItem(line);
  };
  useEffect(() => {
    handleIsOpen(false);
  }, []);
  return (
    <div
      className={`inline-flex translate-y-6  items-center justify-center rounded-full  px-6 py-4 shadow bg-emerald-700 
        visible
      `}
    >
      <div
        className={`text-lg h-6 w-32 cursor-pointer text-center font-sodo-sans font-semibold leading-snug tracking-wider text-white flex items-center justify-center  `}
      >
        <button
          className={`text-white inline-block`}
          disabled={isOpen}
          onClick={() => {
            handleIsOpen(true);
            addNewItem();
          }}
        >
          {isOpen ? (
            <span
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent  motion-reduce:animate-[spin_1.5s_linear_infinite] mt-2"
              role="status"
            ></span>
          ) : (
            <span>Add to Order</span>
          )}
        </button>
      </div>
    </div>
  );
}
