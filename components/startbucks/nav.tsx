import Image from 'next/image';
import Link from 'next/link';
import ButtonSignOut from './button-sign-out';

export default async function Nav() {
  return (
    <>
      <div className=" fixed origin-left-right top-0 w-full z-10 flex h-[5rem]  items-center justify-between bg-white px-4 lg:h-[6.1876rem] lg:px-10  lg:shadow font-bold ">
        <div className="flex items-center ">
          <div className="mr-10 h-[3.1875rem] w-[3.1875rem] max-md:h-[2.5rem] max-md:w-[2.5rem]">
            <Link href="/" className="relative block h-full w-full">
              <Image
                src="/logo_starbucks.svg"
                alt="메인로고"
                fill={true}
                sizes="w-[3.1875rem],max-md-[2.5rem]"
              />
            </Link>
          </div>
          <div className="flex  text-sm font-bold leading-snug tracking-widest max-md:hidden">
            <Link
              className="block  pr-[1.5rem]  hover:text-seagreen"
              href="/menu"
            >
              ORDER
            </Link>
            <Link
              className="block pr-[1.5rem] hover:text-seagreen"
              href="/cards"
            >
              CARDS
            </Link>
            <Link
              className="block pr-[1.5rem] hover:text-seagreen"
              href="/gift"
            >
              GIFT
            </Link>
          </div>
        </div>
        {/* 모바일 버튼 */}
        <div className="md:hidden">
          <div className="relative h-6 w-6 text-black">
            <Image src="/hamburger.svg" fill alt="햄버거버튼" sizes="h-6 w-6" />
          </div>
        </div>
        {/* 그외 디바이스 */}
        <div className="max-md:hidden ">
          <div className="flex items-center justify-between">
            <div className="flex items-center ">
              <div className="relative mr-1 h-[1.75rem] w-[1.75rem] ">
                <Image
                  src="/location.svg"
                  alt="location"
                  fill
                  sizes="h-[1.75rem] w-[1.75rem]"
                />
              </div>
              <div className="text-sm font-bold leading-snug ">
                <Link href="/store-locator" className="hover:text-seagreen">
                  Find a store
                </Link>
              </div>
            </div>
            <div className="ml-12 flex items-center">
              <ButtonSignOut />
              <Link
                href="/account/create"
                className="ml-4 block rounded-[3.125rem] border border-solid bg-black px-4 py-2 text-center text-white hover:bg-gray-500"
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
