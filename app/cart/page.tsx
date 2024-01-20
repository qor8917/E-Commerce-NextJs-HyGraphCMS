import CartModify from '@/components/startbucks/cart/cart-modify';
import FloorDrawerStore from '@/components/startbucks/floor-drawer-store';
import Footer from '@/components/startbucks/footer';
import Loading from '@/components/startbucks/loading';
import ContinueModal from '@/components/startbucks/modal-continue';
import getCartById from '@/hygraph/cart/get-cart';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
export default async function CartPage() {
  const cartId = cookies().get('cartId')?.value;
  const cart = await getCartById(cartId!);
  const subtotalAmount = cart.cartLines.reduce(
    (acc, line) => (acc += line.cost.amount),
    0
  );
  const totalTaxAmount = subtotalAmount * 0.1;
  const totalAmount = subtotalAmount + totalTaxAmount;

  return (
    <div className="relative z-0 bg-white font-sodo-sans leading-snug text-black lg:pt-[6.1876rem] pt-[5rem]">
      {/* 타이틀 */}
      <div className="fixed bottom-0 left-0 top-0 z-0 flex min-w-[40%]  flex-col items-start justify-between bg-[#1E3932] px-10 pt-[99px] text-white max-lg:relative max-lg:justify-start max-lg:px-4 max-lg:py-2">
        <Link href="/menu" className="flex items-center justify-start gap-x-2 ">
          <span>
            <Image
              src="/down_arrow_white.svg"
              alt="Back to menu"
              width={24}
              height={24}
              className=" rotate-90"
            />
          </span>
          <span className="py-4 font-[700] leading-6 text-white">
            Back to menu
          </span>
        </Link>
        <div className="flex w-full flex-col  items-start justify-center gap-y-2 max-md:gap-y-0">
          <div className="text-2xl font-[700] leading-9 max-md:text-base max-md:leading-4">
            Review Order &#40; <span>5</span> &#41;
          </div>
          <div className=" opacity-70 max-md:text-sm">Prep time: 4-9 min</div>
          <Link
            href={{
              pathname: '/store-locator',
            }}
          >
            <div className="my-2 flex w-full items-center justify-between border-b-2 border-b-whitesmoke leading-5 text-white max-md:flex-auto">
              <FloorDrawerStore />
            </div>
          </Link>
          <div className="flex flex-col gap-y-2 pt-2">
            <div className="opacity-80">Pick up method</div>
            <div className=" ">
              <Image
                src="/drive_through_white.svg"
                alt="down-arrow"
                width={24}
                height={24}
              />
            </div>
            <div>Drive-Thru</div>
          </div>
        </div>
        <div className="py-4"></div>
      </div>
      {/* 콘텐츠 */}
      <Suspense fallback={<Loading />}>
        <div className="relative ml-[40%] overflow-hidden max-lg:ml-0">
          <div className="flex flex-col gap-y-2 bg-[#F9F9F9] p-4 items-center ">
            {/* Summary */}
            <div className="flex rounded-[0.75rem] p-8 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] w-[80%] max-xl:min-w-full flex-col bg-white gap-y-2 ">
              <div className="flex">
                <div className="flex basis-[80%]">
                  <div className=" opacity-60">Subtotal</div>
                  <div className="underline-offset-2 flex-grow border-dotted border-b-2 border-gray-100 border-"></div>
                </div>
                <div className="basis-[20%] font-semibold flex justify-end items-center">
                  ￦{subtotalAmount.toLocaleString()}
                </div>
              </div>
              <div className="flex">
                <div className="flex basis-[80%]">
                  <div className=" opacity-60">Tax</div>
                  <div className="underline-offset-2 flex-grow border-dotted border-b-2 border-gray-100 border-"></div>
                </div>
                <div className="basis-[20%] font-semibold flex justify-end items-center">
                  ￦{totalTaxAmount.toLocaleString()}
                </div>
              </div>
              <div className="flex text-2xl font-bold">
                <div className="flex basis-[80%]">
                  <div>Total</div>
                  <div className="underline-offset-2 flex-grow border-dotted border-b-2 border-gray-100 border-"></div>
                </div>
                <div className="basis-[20%] font-semibold flex justify-end items-center">
                  ￦{totalAmount.toLocaleString()}
                </div>
              </div>
            </div>
            {/* 카트에 담긴 물품들 */}
            {cart &&
              cart?.cartLines.reverse().map(({ merchandise, id }, i) => {
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
                          (product &&
                            product.images &&
                            product.images[0]?.url) ??
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
                            <div className=" opacity-50">{options.name}</div>

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
              })}
          </div>

          {/* 푸터 */}
          <Footer />
          {/* 컨티뉴 모달창 */}
          <ContinueModal />
        </div>
      </Suspense>
    </div>
  );
}
