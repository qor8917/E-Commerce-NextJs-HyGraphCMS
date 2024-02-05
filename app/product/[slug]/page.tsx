import ProductSelection from '@/components/startbucks/product/product-selelction';
import TopMenu from '@/components/startbucks/top-menu';
import getProductBySlug from '@/hygraph/get-product';
import { Metadata } from 'next';
import Image from 'next/image';
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  const { name, description } = product;

  return {
    title: name,
    description: description,
  };
}
export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  const { name, images, description, collection } = product;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    productID: product.id,
    name: product.name,
    description: product.description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/product/${params.slug}`,
    image: product.images[0],
    brand: 'Starbucks',
    offers: [
      {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'KRW',
        itemCondition: 'https://schema.org/NewCondition',
        availability: 'https://schema.org/InStock',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="font-sodo-sans  lg:pt-[6.1876rem] pt-[5rem]">
        {/* 탑메뉴 */}
        <TopMenu />
        {/* 상품 이미지 및 타이틀 */}
        <div className=" flex gap-x-8 bg-[#1F3933] px-32 text-white max-xl:px-12 max-lg:flex-col max-lg:items-center max-lg:justify-center max-lg:px-5 max-lg:pb-8  ">
          <div className="relative max-lg:shrink-1 shrink-0 basis-[33%] max-lg:basis-[100%]  p-4">
            <div className=" w-[300px] h-[300px]  overflow-hidden rounded-[50%] flex justify-center items-center">
              <Image
                alt={(product.images && images[0]?.fileName) ?? '이미지없음'}
                src={(product.images && images[0]?.url) ?? '/drink_loading.png'}
                width={300}
                height={300}
                sizes=""
                placeholder="blur"
                blurDataURL="/drink_loading.png"
              />
            </div>
          </div>
          <div className="flex basis-[66%] flex-col items-start justify-center gap-y-4 max-lg:basis-[100%] max-lg:items-center">
            <div className=" tex text-[2.25rem] font-bold leading-[2.9025rem]">
              {name}
            </div>
            <div className="flex opacity-70">
              <div className=" flex tracking-wider ">
                <span>100</span> <span> calories</span>
              </div>
              <div className="relative">
                <Image
                  alt="information"
                  src="/information.svg"
                  width={16}
                  height={16}
                />
              </div>
            </div>
          </div>
        </div>
        {/* info & select */}
        {collection.slug === 'drinks' ? (
          <ProductSelection product={product} />
        ) : (
          <div></div>
        )}

        {/* 설명 */}
        <div className="flex  flex-col items-start gap-y-4 bg-[#1F3933] px-32 py-8 leading-5 text-white  max-lg:px-5">
          <div className="text-sm text-[#CBA258]">200 ★ item</div>
          <p className="max-w-[26.25rem] text-sm opacity-70">{description}</p>
          <div className="flex ">
            <div className="text-sm font-[600]">
              15 calories, 0g sugar, 0g fat
            </div>
            <div>
              <Image alt="aa" src="/information.svg" width={16} height={16} />
            </div>
          </div>
          <div className="rounded-[3.125rem] border-[2px] border-solid border-white px-4 py-2 text-center font-[600]">
            Full nutrition & ingredients list
          </div>
        </div>
      </div>
    </>
  );
}
