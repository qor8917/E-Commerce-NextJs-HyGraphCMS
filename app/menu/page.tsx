import CollectionsList from '@/components/startbucks/collections-list';
import Loading from '@/components/startbucks/loading';
import getAllCollections from '@/hygraph/get-all-collections';
import { Collection } from '@/types/types';
import { Suspense } from 'react';

export default async function DrinkPage() {
  const collections: Collection[] = await getAllCollections();
  return (
    <div className="flex-1 px-[7.44rem] max-lg:px-0">
      <div className="w-full self-stretch text-3xl font-bold leading-10 tracking-normal text-black text-opacity-90 max-md:max-w-full">
        Menu
      </div>
      <Suspense fallback={<Loading />}>
        <div className="max-w-[74.87375rem]  pb-10 max-lg:px-0">
          {collections.map((collection, i) => {
            return <CollectionsList collection={collection} key={i} />;
          })}
        </div>
      </Suspense>
    </div>
  );
}
{
  /* <div className="fixed bottom-0 left-0 right-0 flex h-[74px] items-center justify-between gap-x-4 border-opacity-90 bg-papagreen px-96 text-white max-xl:px-32 max-md:px-4 max-sm:text-sm">
<div className="flex items-center justify-between border-b-2 border-b-whitesmoke leading-5 max-md:flex-auto">
  <div>
    <span className=" mr-2 opacity-80">For item availability</span>
    <span className=" font-semibold max-sm:font-normal"> Choose a store</span>
  </div>
  <div className="ml-4 flex-none pt-1">
    <Image src="down_arrow_white.svg" alt="down-arrow" width={24} height={24} />
  </div>
</div>
<div>
  <div className=" relative h-[32px] w-[32px]">
    <div className=" transl transl transl absolute left-[50%] top-[55%] z-20 -translate-x-1/2  -translate-y-1/2 font-bold ">
      11
    </div>
    <Image
      src="bag.svg"
      alt="bag"
      width={32}
      height={32}
      className="transl transl absolute left-[50%] top-[50%] z-10 block -translate-x-1/2 -translate-y-1/2"
    />
  </div>
</div>
상품추가되었을때 푸터 팝업
<div className="fixed bottom-[74px] left-0 right-0 hidden">
  <div className="flex h-16 items-center justify-between bg-seagreen p-4 opacity-90">
    <div>Oleato Golden Foam™ Cold Brew added.</div>
    <div>
      <Image src="close.svg" alt="close" width={16} height={16} />
    </div>
  </div>
</div>
</div> */
}
