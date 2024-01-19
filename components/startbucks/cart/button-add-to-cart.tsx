'use client';
import useActionStore from '@/store/store-action';
import useProductStore from '@/store/store-product';
import { Product } from '@/types/types';
import { Transition } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { addItem } from './actions';

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
    console.log('새러');
  }, []);

  const [active, setActive] = useState(false);
  const { setCurrentProduct } = useProductStore();

  const payload = { product, selectedOptions: options };
  const [addItemState, addItemFortState] = useFormState(addItem, null);
  const addItemFortStateWithVariants = addItemFortState.bind(null, payload);

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
      <form action={addItemFortStateWithVariants} className="block">
        <SubmitButton />
        <p aria-live="polite" className="sr-only" role="status">
          {addItemState}
        </p>
      </form>
    </Transition>
  );
}
function SubmitButton() {
  const { pending } = useFormStatus();
  const { handleIsOpen } = useActionStore();
  useEffect(() => {
    handleIsOpen(pending);
  }, [pending]);
  return (
    <div
      className={`inline-flex translate-y-6  items-center justify-center rounded-full  px-6 py-4 shadow bg-emerald-700 ${
        pending ? 'invisible' : 'visible'
      }`}
    >
      <div
        className={`text-lg h-6 w-32 cursor-pointer text-center font-sodo-sans font-semibold leading-snug tracking-wider text-white flex items-center justify-center  `}
      >
        <button
          className={`text-white inline-block`}
          disabled={pending}
          onClick={() => {
            handleIsOpen(true);
          }}
        >
          {pending ? (
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
