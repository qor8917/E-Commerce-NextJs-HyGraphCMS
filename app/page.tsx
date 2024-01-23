import ButtonOrder from '@/components/startbucks/button-order';
import Footer from '@/components/startbucks/footer';
import Test from '@/worker/test';
import Image from 'next/image';
import Link from 'next/link';

export default function Main() {
  return (
    <div className="relative z-0 bg-white font-sodo-sans leading-snug text-black lg:pt-[6.1876rem] pt-[5rem]">
      {/* 타이틀 */}
      <div className="fixed bottom-0 left-0 top-0 z-0 flex min-w-[40%] items-center  justify-center text-3xl font-bold shadow-[1px_1px_1px_1px_#00000024] max-lg:relative max-lg:justify-start max-lg:px-4 max-lg:py-2 max-lg:text-xl">
        Festive faves await &nbsp; ❤️
      </div>
      {/* 콘텐츠 */}
      <div className=" ml-[40%] overflow-hidden max-lg:ml-0">
        {/* 캐러셀 */}
        <div className="flex flex-col px-10 max-lg:px-4">
          <div className=" py-6 text-sm  font-bold leading-snug tracking-widest max-md:pb-2">
            STARBUCKS® REWARDS
          </div>
          {/* 슬라이드 */}
          <div className="no-scrollbar relative flex touch-pan-x snap-x snap-mandatory items-start  justify-center overflow-x-auto scroll-smooth text-xl font-[400] max-sm:text-base">
            <div
              id="reward1"
              className=" flex basis-1/3 flex-col px-2   max-md:min-w-[21.3rem]"
            >
              <div className=" relative aspect-video overflow-hidden rounded-[0.333rem] ">
                <Image
                  src="/reward1.jpg"
                  alt="reward1"
                  fill
                  sizes="max-md:min-w-[21.3rem] "
                  priority
                />
              </div>
              <div className=" py-8 leading-[1.78rem] max-sm:py-6">
                Let us treat you—earn and redeem Stars for free drinks, food and
                more.
              </div>
            </div>
            <div
              id="reward2"
              className=" flex  basis-1/3 flex-col  px-2   max-md:min-w-[21.3rem]"
            >
              <div className=" relative  aspect-video overflow-hidden rounded-[0.333rem] ">
                <Image
                  src="/reward2.jpg"
                  alt="reward2"
                  fill
                  sizes="max-md:min-w-[21.3rem]"
                  priority
                />
              </div>
              <div className=" py-8 leading-[1.78rem] max-sm:py-6">
                Customize your order in the app and pick it up when it’s ready.
              </div>
            </div>
            <div
              id="reward3"
              className=" flex basis-1/3 flex-col  px-2   max-md:min-w-[21.3rem]"
            >
              <div className=" relative  aspect-video overflow-hidden rounded-[0.333rem] ">
                <Image
                  src="/reward3.jpg"
                  alt="reward3"
                  fill
                  sizes="max-md:min-w-[21.3rem] "
                  priority
                />
              </div>
              <div className=" py-8 leading-[1.78rem] max-sm:py-6">
                Stop in on your birthday for a special treat on the house.
              </div>
            </div>

            {/* 네비게이션버튼 */}
            <div className="absolute left-1 top-[30%] z-20 -mt-4 w-auto cursor-pointer rounded-[50%] bg-white p-2 shadow-[rgba(17,_17,_26,_0.25)_0px_0px_8px] md:hidden">
              <Image
                src="/left_arrow.svg"
                width={24}
                height={24}
                alt="left-arrow"
              />
            </div>
            <div className="absolute right-1 top-[30%] z-20 -mt-4 w-auto cursor-pointer rounded-[50%] bg-white p-2 shadow-[rgba(17,_17,_26,_0.25)_0px_0px_8px] md:hidden">
              <Image
                src="/right_arrow.svg"
                width={24}
                height={24}
                alt="left-arrow"
              />
            </div>
          </div>
          <div className=" flex  items-center pb-6 text-center">
            <Link
              href=""
              className="mr-4 block rounded-[3.125rem] border border-solid bg-black px-4 py-2 text-center text-white hover:bg-gray-500"
            >
              Join now
            </Link>
            <Link
              href=""
              className="block rounded-[3.125rem] border border-solid px-4 py-2 text-center hover:bg-gray-100"
            >
              Learn more
            </Link>
          </div>
        </div>
        {/* 광고 */}
        <div className="flex flex-col items-center gap-4 bg-whitesmoke py-12 max-lg:px-4 max-sm:px-2 max-sm:py-6">
          {/* 질문 */}
          <div className="flex flex-col items-stretch overflow-hidden rounded-xl bg-white px-4 py-5 shadow-sm max-lg:w-full lg:min-w-[31.25rem]">
            {/* 타이틀 */}
            <div className="justify-center text-2xl font-bold leading-10 tracking-normal text-black text-opacity-90 max-lg:max-w-full">
              <div className="max-w-[30rem]  max-lg:max-w-full">
                Answer a few questions to find something new
              </div>
            </div>
            <div className="border-t-opacity-10 mt-5 flex h-px shrink-0 flex-col border-t border-solid border-gray-400 max-lg:max-w-full" />
            <div className="mt-5 justify-center text-base leading-6 tracking-normal text-black text-opacity-90 max-lg:max-w-full">
              What type of drink are you looking for?
            </div>
            {/* 차가운음료 */}
            <div className="relative mt-4 min-h-[6.56rem] overflow-hidden rounded-xl bg-lightcyan px-4 pt-7 max-lg:max-w-full">
              <div className="flex gap-5  ">
                <div className="flex flex-col items-stretch ">
                  <div className="justify-center text-xl leading-7  tracking-normal text-black text-opacity-90 max-sm:text-base ">
                    <span className="font-bold">
                      Iced
                      <br />
                    </span>
                    <span>Cool off and uplift</span>
                  </div>
                </div>
                <div className="absolute -bottom-4 right-5 ml-5 aspect-square ">
                  <Image
                    src="/iced_drink.png"
                    width={77}
                    height={107}
                    alt="drink"
                    className="shrink-0 grow overflow-hidden object-cover object-center"
                  />
                </div>
              </div>
            </div>
            {/* 뜨거운음료 */}
            <div className="relative mt-4 min-h-[6.56rem] overflow-hidden rounded-xl bg-lightcyan pl-4 pt-7 max-lg:max-w-full">
              <div className="flex gap-5">
                <div className="flex  flex-col items-stretch">
                  <div className="my-auto  justify-center  text-xl leading-7  tracking-normal text-black text-opacity-90 max-sm:text-base ">
                    <span className="font-bold">
                      Hot
                      <br />
                    </span>
                    <span className="">Warm up and get going</span>
                  </div>
                </div>
                <div className=" absolute -bottom-4 -right-2  ml-5 aspect-square ">
                  <Image
                    src="/hot_drink.png"
                    width={102}
                    height={185}
                    alt="drink"
                    className="shrink-0 grow overflow-hidden object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* 카드 */}
          <div className=" flex flex-col  items-stretch justify-center overflow-hidden rounded-xl bg-white pb-6 shadow-sm max-lg:w-full lg:max-w-[31.25rem]">
            <div className="relative aspect-video">
              <Image
                src="/DecemberThursday_tcm121-87811.jpg"
                alt="DecemberThursday_tcm121"
                fill
                sizes="max-lg:w-full,lg:max-w-[31.25rem]"
              />
            </div>
            <div className="mt-9 flex w-full flex-col items-end px-6 max-lg:max-w-full max-lg:px-5 max-sm:mt-4">
              <div className="justify-center self-stretch text-xl font-semibold leading-7 tracking-normal text-black text-opacity-90 max-lg:max-w-full">
                Half off a drink
              </div>
              <div className="text mt-5 justify-center self-stretch text-base leading-6 tracking-normal text-black text-opacity-90 max-lg:max-w-full max-sm:mt-2 max-sm:text-sm ">
                Feeling festive? Join before noon Wednesday for half off a drink
                this Thursday from 12-6 PM. At participating stores. Limit one
                drink per member per week in December.
              </div>
              <div className="mt-5 items-stretch justify-center whitespace-nowrap rounded-[50px] border border-solid border-emerald-700 bg-emerald-700 px-4 py-2 text-center text-base font-semibold leading-5 tracking-normal text-white max-sm:mt-2">
                Join now
              </div>
            </div>
          </div>
          {/* 두번쨰 카드 */}
          <div className=" flex flex-col items-stretch  justify-center overflow-hidden rounded-xl bg-white pb-6 shadow-sm max-lg:w-full lg:max-w-[31.25rem]">
            <div className="relative aspect-video">
              <Image
                src="/UnauthEOYGiftCardUS_tcm121-87866.jpg"
                alt="UnauthEOYGiftCardUS_tcm121"
                fill
                sizes="lg:max-w-[31.25rem],max-lg:w-full "
              />
            </div>
            <div className="mt-9  flex  w-full flex-col items-end px-6 max-lg:max-w-full max-lg:px-5 max-sm:mt-4">
              <div className="justify-center self-stretch text-xl font-semibold leading-7 tracking-normal text-black text-opacity-90 max-lg:max-w-full">
                Gift cards keep on giving 🎁
              </div>
              <div className="mt-5 justify-center self-stretch text-base leading-6  tracking-normal text-black text-opacity-90 max-lg:max-w-full max-sm:text-sm">
                Join Starbucks® Rewards and start earning free drinks & food
                when you use gift cards in the app. At participating stores.
                Restrictions apply. See starbucks.com/rewards.
              </div>
              <div className="mt-5 items-stretch justify-center whitespace-nowrap rounded-[50px] border border-solid border-emerald-700 bg-emerald-700 px-4 py-2 text-center text-base font-semibold leading-5 tracking-normal text-white">
                Join now
              </div>
            </div>
          </div>
        </div>
        {/* 푸터 */}
        <Footer />
      </div>
      <div className="fixed bottom-12 right-4 lg:right-10">
        <ButtonOrder />
      </div>
    </div>
  );
}
