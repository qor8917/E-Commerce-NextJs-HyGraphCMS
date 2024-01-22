'use client';
import useCartStore from '@/store/store-cart';
import useProductStore from '@/store/store-product';
import { CartItem, Product } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

export default function CartModify({
  product,
  selectedOptions,
  id,
}: {
  product: Product;
  selectedOptions: Record<string, string | number>[];
  id: string;
}) {
  const {
    currentCart,
    addCurrentCartItem,
    removeCurrentCartItem,
    updateCurrentCartItem,
  } = useCartStore();

  const { setCurrentOption, setLineId } = useProductStore();
  const payload = { product, selectedOptions };
  // const [addState, addFormState] = useFormState(addItem, null);
  // const [removeState, removeFormState] = useFormState(removeItem, null);
  // const actionWithVariant = addFormState.bind(null, payload);
  // const removeActionWithVariant = removeFormState.bind(null, id);
  // const { pending } = useFormStatus();

  return (
    <div className="flex gap-x-4">
      <div>
        <Link
          href={{ pathname: `/product/${product.slug}` }}
          onClick={() => {
            setCurrentOption(selectedOptions);
            setLineId(id);
          }}
        >
          <Image src="/modify.svg" alt="product" width={24} height={24} />
        </Link>
      </div>
      {/* <form action={removeActionWithVariant}> */}
      <div>
        {/* <SubmitButton type="minus" id={id} /> */}
        <button
          onClick={() => {
            removeCurrentCartItem(id);
          }}
          // disabled={pending}
          // className={`${pending ? 'animate-spin' : ''}`}
        >
          <Image src={`/minus_green.svg`} alt="minus" width={24} height={24} />
        </button>
        {/* <p aria-live="polite" className="sr-only" role="status">
          {removeState}
        </p> */}
      </div>
      {/* <form action={actionWithVariant}> */}
      <div>
        {/* <SubmitButton type="plus" id={id} /> */}
        <button
          onClick={() => {
            const newItem = {
              ...currentCart.find((item) => item.id),
              id: uuidv4(),
            } as CartItem;

            addCurrentCartItem(newItem);
          }}
          // disabled={pending}
          // className={`${pending ? 'animate-spin' : ''}`}
        >
          <Image src={`/plus_green.svg`} alt="plus" width={24} height={24} />
        </button>
        {/* <p aria-live="polite" className="sr-only" role="status">
          {addState}
        </p> */}
      </div>
    </div>
  );
}

// function SubmitButton({ type, id }: { type: 'plus' | 'minus'; id: string }) {
//   const { pending } = useFormStatus();

//   return (
//     <button
//       onClick={() => {
//         if (type == 'minus') {
//           removeCurrentCartItem(id);
//         } else {
//           const newItem = {
//             ...currentCart.find((item) => item.id),
//             id: uuidv4(),
//           } as CartItem;

//           addCurrentCartItem(newItem);
//         }
//       }}
//       disabled={pending}
//       className={`${pending ? 'animate-spin' : ''}`}
//     >
//       <Image src={`/${type}_green.svg`} alt={type} width={24} height={24} />
//     </button>
//   );
// }
