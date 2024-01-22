'use client';
import useCartStore from '@/store/store-cart';
import { Product } from '@/types/types';
import { Transition } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ButtonUpdateToCart({
  product,
  options,
  lineId,
}: {
  product: Product;
  options: Record<string, string | number>[];
  lineId: string | null;
}) {
  useEffect(() => {
    setActive(true);
  }, []);
  const [active, setActive] = useState(false);
  const payload = { product, selectedOptions: options, lineId };
  // const [addItemState, addItemFortState] = useFormState(updateItem, null);
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
      <div className="block">
        {/* <form action={addItemFortStateWithVariants} className="block"> */}

        <SubmitButton payload={payload} />
        {/* <p aria-live="polite" className="sr-only" role="status">
          {addItemState}
        </p> */}
      </div>
    </Transition>
  );
}
function SubmitButton({ payload }: { payload: any }) {
  // const { pending } = useFormStatus();
  const route = useRouter();

  const { currentCart, updateCurrentCartItem } = useCartStore();
  return (
    <div
      className={`inline-flex translate-y-6  items-center justify-center rounded-full  px-6 py-4 shadow bg-emerald-700`}
    >
      <div
        className={`text-lg h-6 w-32 cursor-pointer text-center font-sodo-sans font-semibold leading-snug tracking-wider text-white flex items-center justify-center`}
      >
        <button
          onClick={() => {
            const { product, selectedOptions, lineId } = payload;

            const [size, ...rest] = selectedOptions;
            const amount = selectedOptions.reduce((acc: any, option: any) => {
              acc += option.price as number;
              return acc;
            }, 0);
            const line = {
              id: lineId,
              quantity: 1,
              cost: { amount: amount, currencyCode: 'krw' },
              merchandise: {
                selectedOptions: rest,
                selectedSize: size,
                product: product,
              },
            };
            updateCurrentCartItem(line);
            route.push('/cart');
          }}
          className={`text-white inline-block`}
          // disabled={pending}
        >
          {/* {pending ? (
            <span
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent  motion-reduce:animate-[spin_1.5s_linear_infinite] mt-2"
              role="status"
            ></span>
          ) : ( */}
          <span>Update item</span>
          {/* )} */}
        </button>
      </div>
    </div>
  );
}
