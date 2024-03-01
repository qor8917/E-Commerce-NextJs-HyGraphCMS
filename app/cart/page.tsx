import CartList from '@/components/startbucks/cart/cart-list';
import FloorDrawerStore from '@/components/startbucks/floor-drawer-store';
import Footer from '@/components/startbucks/footer';
import ContinueModal from '@/components/startbucks/modal-continue';
import Image from 'next/image';
import Link from 'next/link';
export default async function CartPage() {
  return (
    <div className="relative z-0 bg-white font-sodo-sans leading-snug text-black lg:pt-[6.1876rem] pt-[5rem]">
      {/* 타이틀 */}
      <div className="fixed bottom-0 left-0 top-0 z-0 flex min-w-[40%]  flex-col items-start justify-between bg-[#1E3932] px-10 pt-[99px] text-white max-lg:relative max-lg:justify-start max-lg:px-4 max-lg:py-2 max-lg:min-w-full">
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
            {/* Review Order &#40; <span>5</span> &#41; */}Review Order
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
      <div className="relative ml-[40%] overflow-hidden max-lg:ml-0">
        <div className="flex flex-col gap-y-2 bg-[#F9F9F9] p-4 items-center ">
          {/* 카트에 담긴 물품들 */}
          <CartList />
        </div>

        {/* 푸터 */}
        <Footer />
        {/* 컨티뉴 모달창 */}
        <ContinueModal />
      </div>
    </div>
  );
}
