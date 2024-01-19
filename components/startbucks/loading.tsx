import Image from 'next/image';

export default function Loading() {
  return (
    <div className="w-full flex justify-center items-end p-8 animate-pulse lg:pt-[6.1876rem] pt-[5rem]">
      <Image
        alt="로딩중"
        src="/loading-mug-cup.svg"
        width={100}
        height={100}
        placeholder="blur"
        blurDataURL="/loading-mug-cup.svg"
      />
    </div>
  );
}
