'use client';

import useProductStore from '@/store/store-product';
import { Product, ProductOption } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import ButtonAddToCart from '../cart/button-add-to-cart';
import ButtonUpdateToCart from '../cart/button-update-to-cart';
import OptionSelector from './selector-option';
import SizeSelector from './selector-size';

export default function ProductSelection({ product }: { product: Product }) {
  const { currentOption, setCurrentOption, lineId } = useProductStore();
  const { productSizes, productOptions } = product;
  const [options, setOptions] = useState<
    Record<string, Record<string, string>>
  >({});

  useEffect(() => {
    if (currentOption) {
      const optionObj: Record<string, Record<string, string>> = {};
      //size
      Object.assign(optionObj, { size: currentOption[0] });
      //options
      for (const option of product.productOptions || []) {
        Object.assign(optionObj, {
          [option.name]: currentOption.filter((sel) => {
            const found = option.children.find(
              (child) => child.name === sel.name
            );
            if (found) return true;
          })[0],
        });
        setOptions(optionObj);
      }
    } else {
      const optionObj: Record<string, Record<string, string>> = {};
      //size
      Object.assign(optionObj, { size: productSizes[0] });
      //options
      for (const option of product.productOptions || []) {
        Object.assign(optionObj, { [option.name]: option.children[0] });
        setOptions(optionObj);
      }
    }

    return () => {
      setCurrentOption(null);
      console.log(currentOption);
    };
  }, [product]);
  const variant = useMemo(() => {
    const selectedOptions = Object.values(options).map((option) => option);
    console.log(selectedOptions);
    return selectedOptions;
  }, [options]);

  const updateOptions = (
    key: string,
    update: Record<string, string | number>
  ) => {
    const newDate = Object.assign(options, { [key]: update });

    setOptions({ ...options, ...newDate });
  };

  return (
    <>
      <div className=" flex gap-x-8 px-32  py-12 max-lg:flex-col max-lg:items-center max-lg:justify-center max-lg:gap-y-12 max-lg:px-5 max-lg:pb-8">
        {/* size info */}
        <div className=" flex min-w-[26.25rem] shrink-0 flex-col gap-y-4 max-sm:min-w-[20rem]">
          <div className=" mb-4 border-b-4 border-solid border-[#D4E9E2] text-[1.5rem] font-[600] leading-[3rem]">
            Size options
          </div>
          <SizeSelector
            productSizes={productSizes}
            updateOptions={updateOptions}
            currentOption={currentOption && currentOption[0]}
          />
          <div className=" flex py-4 opacity-70">
            <span>
              <Image
                alt="location"
                src="/location.svg"
                width={24}
                height={24}
              />
            </span>
            <span>Select a store to view availability</span>
          </div>
        </div>
        {/* what's included */}
        <div className="min-w-[26.25rem] shrink-0 max-sm:min-w-[20rem]">
          <div className=" mb-4 border-b-4 border-solid border-[#D4E9E2] text-[1.5rem] font-[600] leading-[3rem]">
            What&apos;s included
          </div>
          {productOptions.map((option: ProductOption, i: number) => {
            return (
              <OptionSelector
                option={option}
                updateOptions={updateOptions}
                currentOption={currentOption && currentOption[i + 1]}
                key={i}
              />
            );
          })}
          <div className="py-4">
            <Link
              href={'/customize'}
              className="flex items-center justify-center gap-x-2 rounded-[31.25rem] bg-[#1E3932] px-[1.5rem] py-[1rem] shadow"
            >
              <Image
                alt="plus_green"
                src="/customize.svg"
                width={24}
                height={24}
              />
              <span className="text-xl font-[600] text-white">Customize</span>
            </Link>
          </div>
        </div>
        <div className="shrink-1 "></div>
      </div>
      <div className="fixed bottom-32  right-12 max-lg:right-4">
        {currentOption == null ? (
          <ButtonAddToCart product={product} options={variant} />
        ) : (
          <ButtonUpdateToCart
            product={product}
            options={variant}
            lineId={lineId}
          />
        )}
      </div>
    </>
  );
}
