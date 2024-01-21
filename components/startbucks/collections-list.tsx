'use client';
import { Collection } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function CollectionsList({
  collection,
}: {
  collection: Collection;
}) {
  const searchParams = useSearchParams();
  const newParams = new URLSearchParams(searchParams.toString());
  const { name, categories } = collection;
  newParams.delete('q');
  return (
    <>
      {/* 소 타이틀 */}
      <div className="mt-12 w-full self-stretch text-2xl font-bold leading-9 tracking-normal text-black text-opacity-90 max-lg:mt-8 max-md:max-w-full">
        {name}
      </div>
      <div className="mb-8 mt-4 flex min-h-[1px] w-full flex-col self-stretch border-t border-solid border-t-[color:var(--black-10,rgba(0,0,0,0.10))] max-md:max-w-full" />
      {/* 리스트 */}
      <div className="flex flex-wrap gap-y-8 ">
        {categories &&
          categories.map((category, i) => {
            const { name, image, slug } = category;
            return (
              <Link
                key={i}
                href={`/menu/${slug}`}
                className="flex basis-1/2 cursor-pointer items-center gap-4 text-xl max-md:basis-full"
              >
                <div className=" overflow-hidden rounded-[50%] max-md:h-[74px] max-md:w-[74px]">
                  <Image
                    alt={image.fileName ?? '이미지없음'}
                    src={image.url ?? '/drink_loading.png'}
                    width={112}
                    height={112}
                    placeholder="blur"
                    blurDataURL="/drink_loading.png"
                  />
                </div>
                <div>{name}</div>
              </Link>
            );
          })}
      </div>
    </>
  );
}
