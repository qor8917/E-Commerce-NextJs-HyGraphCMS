'use client';
import { Collection } from '@/types/types';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Collections({
  collections,
}: {
  collections: Collection[];
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const newParams = new URLSearchParams(searchParams.toString());

  newParams.delete('q');
  return (
    <div>
      {collections.map((collection, i) => {
        const { name, categories } = collection;

        return (
          <div key={i}>
            <div className="text-xl w-full cursor-pointer self-stretch font-semibold leading-7 tracking-normal text-black text-opacity-90">
              {name}
            </div>
            <div className="flex flex-col gap-y-4 py-4">
              {categories.map((category, i) => {
                const { name, slug } = category;

                const active = pathname === name;
                const DynamicTag = active ? 'p' : Link;

                return (
                  <DynamicTag
                    key={i}
                    href={`/menu/${slug}`}
                    className="text-base leading-6 tracking-normal text-black text-opacity-60"
                  >
                    {name}
                  </DynamicTag>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
