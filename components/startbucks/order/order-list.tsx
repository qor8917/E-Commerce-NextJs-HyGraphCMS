'use client';
import getOrderById from '@/hygraph/cart/get-order';
import { Cart } from '@/types/types';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CartModify from '../cart/cart-modify';
export default function OrderList() {
  const searchParams = useSearchParams();

  const id = searchParams.get('id');
  // const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<Cart>();

  useEffect(() => {
    const fetchOrder = async () => {
      const ordered = await getOrderById(id as string);
      console.log(ordered);
      setOrder(ordered);
    };

    if (id) fetchOrder();
  }, [id]);

  return (
    <>
      {/* Summary */}
      <div className="flex rounded-[0.75rem] p-8 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] w-[80%] max-xl:min-w-full flex-col bg-white gap-y-2 ">
        <div className="flex">
          <div className="flex basis-[80%]">
            <div className=" opacity-60">Subtotal</div>
            <div className="underline-offset-2 flex-grow border-dotted border-b-2 border-gray-100 border-"></div>
          </div>
          <div className="basis-[20%] font-semibold flex justify-end items-center">
            ￦{order?.cost?.subtotalAmount.amount?.toLocaleString()}
          </div>
        </div>
        <div className="flex">
          <div className="flex basis-[80%]">
            <div className=" opacity-60">Tax</div>
            <div className="underline-offset-2 flex-grow border-dotted border-b-2 border-gray-100 border-"></div>
          </div>
          <div className="basis-[20%] font-semibold flex justify-end items-center">
            ￦{order?.cost?.totalTaxAmount.amount.toLocaleString()}
          </div>
        </div>
        <div className="flex text-2xl font-bold">
          <div className="flex basis-[80%]">
            <div>Total</div>
            <div className="underline-offset-2 flex-grow border-dotted border-b-2 border-gray-100 border-"></div>
          </div>
          <div className="basis-[20%] font-semibold flex justify-end items-center">
            ￦{order?.cost?.totalAmount.amount.toLocaleString()}
          </div>
        </div>
      </div>
      {order?.cartLines ? (
        order?.cartLines.reverse().map(({ merchandise, id }, i) => {
          const { product, selectedOptions, selectedSize } = merchandise;
          const cobinedOptions = [...[selectedSize], ...selectedOptions];
          return (
            <div
              key={i}
              className="flex rounded-[0.75rem] p-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]  bg-white  w-[80%] max-xl:min-w-full"
            >
              <div className="relative flex h-[100px] w-[100px] shrink-0 items-center justify-center overflow-hidden rounded-[50%] max-md:h-[72px] max-md:w-[72px]">
                <Image
                  alt={
                    (product &&
                      product.images &&
                      product.images[0]?.fileName) ??
                    '이미지없음'
                  }
                  src={
                    (product && product.images && product.images[0]?.url) ??
                    '/drink_loading.png'
                  }
                  fill
                  sizes=""
                  placeholder="blur"
                  blurDataURL="/drink_loading.png"
                />
              </div>
              <div className="flex flex-col gap-y-2 px-4 max-md:gap-y-2 w-full">
                <div className="flex w-full">
                  <div className="basis-[80%] leading-8 ">
                    <div className="text-2xl max-md:text-base">
                      {product && product.name}
                    </div>
                    <div className=" opacity-50">{selectedSize.name}</div>
                  </div>
                  <div className="basis-[20%]  font-semibold flex justify-end items-center">
                    ￦{selectedSize.price.toLocaleString()}
                  </div>
                </div>

                {selectedOptions.map((options, i) => (
                  <div className="flex" key={i}>
                    <div className="flex basis-[80%]">
                      {options.name == 'Shots' ? (
                        <div className=" opacity-50">
                          {options.name} x {options.quantity}
                        </div>
                      ) : (
                        <div className=" opacity-50">{options.name}</div>
                      )}

                      {options.price == 0 ? (
                        ''
                      ) : (
                        <div className="underline-offset-2 flex-grow border-dotted border-b-2 border-gray-100 "></div>
                      )}
                    </div>
                    <div className="basis-[20%] font-semibold flex justify-end items-center">
                      {options.price == 0
                        ? ''
                        : `+￦${(
                            options.price * options.quantity
                          ).toLocaleString()}`}
                    </div>
                  </div>
                ))}

                <div>200★ item </div>
                <CartModify
                  product={product}
                  selectedOptions={cobinedOptions}
                  id={id}
                />
              </div>
            </div>
          );
        })
      ) : (
        <div></div>
      )}
    </>
  );
}
