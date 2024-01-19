import Collections from '@/components/startbucks/collections';
import FloorDrawer from '@/components/startbucks/floor-drawer';
import Footer from '@/components/startbucks/footer';
import Loading from '@/components/startbucks/loading';
import getAllCollections from '@/hygraph/get-all-collections';
import { ReactNode, Suspense } from 'react';
export default async function DrinkPage({ children }: { children: ReactNode }) {
  const collections = await getAllCollections();

  return (
    <div className="relative lg:pt-[6.1876rem] pt-[5rem]">
      {/* 탑 메뉴 */}
      <div className="flex flex-col items-start justify-center self-stretch border border-solid border-[color:#EDEBE9] bg-stone-50 pl-32 pr-10 max-lg:px-5">
        <div className="flex items-start justify-between gap-5 pr-20 max-md:max-w-full max-md:flex-wrap max-md:pr-5">
          <div className="flex grow basis-[0%] flex-col items-stretch self-stretch py-3.5">
            <div className="cursor-pointer whitespace-nowrap text-sm leading-5 tracking-normal text-black text-opacity-90">
              Menu
            </div>
            <div className="flex h-px shrink-0 flex-col border-b border-solid border-b-[color:var(--app-starbucks-com-black-87,rgba(0,0,0,0.87))]" />
          </div>
          <div className="my-auto cursor-pointer self-center text-sm leading-5 tracking-normal text-black text-opacity-90">
            Featured
          </div>
          <div className="my-auto cursor-pointer self-center text-sm leading-5 tracking-normal text-black text-opacity-90">
            Previous
          </div>
          <div className="my-auto grow cursor-pointer self-center whitespace-nowrap text-sm leading-5 tracking-normal text-black text-opacity-90">
            Favorites
          </div>
        </div>
      </div>
      {/* 컨텐츠 */}

      <div className="relative flex py-10 pl-32 shadow max-lg:px-4 max-lg:py-4">
        <Suspense fallback={<Loading />}>
          {/* 사이드메뉴 */}
          <div className="max flex max-w-[150px] flex-col items-start self-stretch max-lg:hidden">
            <Collections collections={collections} />
          </div>
          {/* 상품리스트 */}
          {children}
        </Suspense>
      </div>
      {/* 푸터 */}
      <div className="px-20 max-lg:px-0">
        <Footer />
      </div>
      {/* 바닥서랍장 */}
      <FloorDrawer />
    </div>
  );
}
