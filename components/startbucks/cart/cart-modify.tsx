'use client';
import useProductStore from '@/store/store-product';
import { Product } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import { addItem, removeItem } from './actions';

export default function CartModify({
  product,
  selectedOptions,
  id,
}: {
  product: Product;
  selectedOptions: Record<string, string | number>[];
  id: string;
}) {
  const { setCurrentOption, setLineId } = useProductStore();
  const payload = { product, selectedOptions };
  const [addState, addFormState] = useFormState(addItem, null);
  const [removeState, removeFormState] = useFormState(removeItem, null);
  // const [removeState, updateFormState] = useFormState(removeItem, null);
  const actionWithVariant = addFormState.bind(null, payload);
  // const updateactionWithVariant = updateFormState.bind(null, payload);

  const removeActionWithVariant = removeFormState.bind(null, id);

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
      <form action={removeActionWithVariant}>
        <SubmitButton type="minus" />
      </form>
      <form action={actionWithVariant}>
        <SubmitButton type="plus" />
      </form>
    </div>
  );
}

function SubmitButton({ type }: { type: 'plus' | 'minus' }) {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className={`${pending ? 'animate-spin' : ''}`}>
      <Image src={`/${type}_green.svg`} alt={type} width={24} height={24} />
    </button>
  );
}
