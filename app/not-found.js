import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="w-full flex justify-center items-end p-8 lg:pt-[6.1876rem] pt-[5rem]">
      <div className=" text-center flex flex-col items-center p-12">
        <Image
          alt="로딩중"
          src="/loading-mug-cup.svg"
          width={100}
          height={100}
          placeholder="blur"
          blurDataURL="/loading-mug-cup.svg"
        />
        <div>페이지를 준비 중입니다.</div>
        <div
          className={`inline-flex translate-y-6  items-center justify-center rounded-full  px-6 py-4 shadow bg-emerald-700 `}
        >
          <div
            className={`text-lg h-6 w-32 cursor-pointer text-center font-sodo-sans font-semibold leading-snug tracking-wider text-white flex items-center justify-center  `}
          >
            <Link className={`text-white inline-block`} href={'/'}>
              <span>To home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
