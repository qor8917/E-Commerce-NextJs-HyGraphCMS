import Loading from '@/components/startbucks/loading';
import getCategoryBySlug from '@/hygraph/get-category';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);

  return {
    title: category.name,
    description: category.name,
  };
}
export default async function DrinkPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = await getCategoryBySlug(params.slug);
  const { name, products } = category;
  return (
    <div className="flex-1 px-[7.44rem] max-lg:px-0">
      <div className="max-w-[74.87375rem]  pb-10 max-lg:px-0">
        {/* 소 타이틀 */}
        <div className="w-full self-stretch text-2xl font-bold leading-9 tracking-normal text-black text-opacity-90 max-lg:mt-8 max-md:max-w-full">
          {name && name}
        </div>
        <div className="mb-8 mt-4 flex min-h-[1px] w-full flex-col self-stretch border-t border-solid border-t-[color:var(--black-10,rgba(0,0,0,0.10))] max-md:max-w-full" />
        {/* 리스트 */}
        <Suspense fallback={<Loading />}>
          {' '}
          <div className="flex flex-wrap gap-y-8 ">
            {products &&
              products.map((product, i) => {
                const { name, images, slug } = product;
                return (
                  <Link
                    key={i}
                    href={{ pathname: `/product/${slug}` }}
                    className="flex basis-1/2 cursor-pointer items-center gap-4 text-xl max-md:basis-full"
                  >
                    <div className=" shrink-0 overflow-hidden rounded-[50%] w-[112px] h-[112px]  max-sm:max-w-[74px] max-sm:max-h-[74px]">
                      <Image
                        alt={(product.images && images[0]?.fileName) ?? ''}
                        src={(product.images && images[0]?.url) ?? ''}
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
        </Suspense>
      </div>
    </div>
  );
}
