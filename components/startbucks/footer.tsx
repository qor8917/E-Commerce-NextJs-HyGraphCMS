import Image from 'next/image';
export default function Footer() {
  return (
    <div className="px-20 max-lg:px-0 ">
      <div className="flex flex-col bg-white px-10 py-12 text-xl shadow-sm max-lg:px-4  max-sm:text-base ">
        <div className="max-md:flex-wr cursor-pointerup mt-1.5 flex items-center justify-between gap-5 self-stretch px-px max-md:max-w-full">
          <div className=" my-auto justify-center text-center leading-7 text-black text-opacity-90">
            About Us
          </div>
          <Image
            src="/down_arrow.svg"
            alt="down-arrow"
            width={32}
            height={32}
            className="aspect-square w-8 max-w-full shrink-0 self-stretch overflow-hidden object-contain object-center "
          />
        </div>
        <div className="mt-8 flex cursor-pointer items-center justify-between gap-5 self-stretch px-px max-md:max-w-full max-md:flex-wrap">
          <div className=" my-auto justify-center text-center leading-7 text-black text-opacity-90">
            Careers
          </div>
          <Image
            src="/down_arrow.svg"
            alt="down-arrow"
            width={32}
            height={32}
            className="aspect-square w-8 max-w-full shrink-0 self-stretch overflow-hidden object-contain object-center "
          />
        </div>
        <div className="mt-8 flex cursor-pointer items-center justify-between gap-5 self-stretch px-px max-md:max-w-full max-md:flex-wrap">
          <div className=" my-auto justify-center text-center leading-7 text-black text-opacity-90">
            Social Impact
          </div>
          <Image
            src="/down_arrow.svg"
            alt="down-arrow"
            width={32}
            height={32}
            className="aspect-square w-8 max-w-full shrink-0 self-stretch overflow-hidden object-contain object-center "
          />
        </div>
        <div className="mt-8 flex cursor-pointer items-center justify-between gap-5 self-stretch px-px max-md:max-w-full max-md:flex-wrap">
          <div className=" my-auto justify-center text-center leading-7 text-black text-opacity-90">
            For Business Partners
          </div>
          <Image
            src="/down_arrow.svg"
            alt="down-arrow"
            width={32}
            height={32}
            className="aspect-square w-8 max-w-full shrink-0 self-stretch overflow-hidden object-contain object-center "
          />
        </div>
        <div className="mt-8 flex cursor-pointer items-center justify-between gap-5 self-stretch px-px max-md:max-w-full max-md:flex-wrap">
          <div className=" my-auto justify-center text-center leading-7 text-black text-opacity-90">
            Order and Pick Up
          </div>
          <Image
            src="/down_arrow.svg"
            alt="down-arrow"
            width={32}
            height={32}
            className="aspect-square w-8 max-w-full shrink-0 self-stretch overflow-hidden object-contain object-center "
          />
        </div>
        <div className="border-t-opacity-10 mt-10 flex h-0.5 shrink-0 flex-col self-stretch border-t-2 border-solid border-t-gray-100 max-md:max-w-full" />
        <div className="mt-10 flex w-[272px] max-w-full items-stretch gap-4 self-start max-md:justify-center">
          <Image
            src="/spotify.svg"
            alt="spotify"
            width={32}
            height={32}
            className="aspect-square w-full flex-1 shrink-0 overflow-hidden object-contain object-center"
          />
          <Image
            src="/facebook.svg"
            alt="facebook"
            width={32}
            height={32}
            className="aspect-square w-full flex-1 shrink-0 overflow-hidden object-contain object-center"
          />
          <Image
            src="/pinterest.svg"
            alt="pinterest"
            width={32}
            height={32}
            className="aspect-square w-full flex-1 shrink-0 overflow-hidden object-contain object-center"
          />
          <Image
            src="/instagram.svg"
            alt="instagram"
            width={32}
            height={32}
            className="aspect-square w-full flex-1 shrink-0 overflow-hidden object-contain object-center"
          />
          <Image
            src="/youtube.svg"
            alt="youtube"
            width={32}
            height={32}
            className="aspect-square w-full flex-1 shrink-0 overflow-hidden object-contain object-center"
          />
          <Image
            src="/twitter.svg"
            alt="twitter"
            width={32}
            height={32}
            className="aspect-square w-full flex-1 shrink-0 overflow-hidden object-contain object-center"
          />
        </div>
        <div className="mt-11 justify-center self-stretch text-base leading-6 tracking-normal text-black text-opacity-90 max-md:mt-10 max-md:max-w-full">
          Privacy Notice
        </div>
        <div className="mt-7 justify-center self-stretch text-base leading-6 tracking-normal text-black text-opacity-90 max-md:max-w-full">
          Terms of Use
        </div>
        <div className="mt-8 justify-center self-stretch text-base leading-6 tracking-normal text-black text-opacity-90 max-md:max-w-full">
          Do Not Share My Personal Information
        </div>
        <div className="mt-7 justify-center self-stretch text-base leading-6 tracking-normal text-black text-opacity-90 max-md:max-w-full">
          CA Supply Chain Act
        </div>
        <div className="mt-7 justify-center self-stretch text-base leading-6 tracking-normal text-black text-opacity-90 max-md:max-w-full">
          Accessibility
        </div>
        <div className="mt-7 justify-center self-stretch text-base leading-6 text-black text-opacity-90 max-md:max-w-full">
          Cookie Preferences
        </div>
        <div className="mb-20 mt-11 justify-center self-stretch text-sm leading-5 tracking-normal text-black text-opacity-60 max-md:my-10 max-md:max-w-full">
          © 2023 Starbucks Coffee Company. All rights reserved.
        </div>
      </div>
    </div>
  );
}
