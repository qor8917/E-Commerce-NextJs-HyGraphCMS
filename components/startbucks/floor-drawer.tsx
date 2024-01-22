import Link from 'next/link';
import ActiveAddToCart from './floor-drawer-active';
import FloorDrawerCart from './floor-drawer-cart';
import FloorDrawerStore from './floor-drawer-store';

export default async function FloorDrawer() {
  return (
    <div className="relative">
      <div className="bg-papagreen fixed bottom-0 left-0 right-0 flex h-[74px] items-center justify-between gap-x-4 border-opacity-90 px-96 text-white max-xl:px-32 max-md:px-4 max-sm:text-sm z-20">
        <Link
          href={{
            pathname: '/store-locator',
            query: {
              // path: '/menu/hotcoffees'
            },
          }}
        >
          <FloorDrawerStore />
        </Link>
        <div className="relative">
          <Link
            href={{
              pathname: '/cart',
            }}
            className=" relative block h-[32px] w-[32px] text-white"
          >
            <FloorDrawerCart />
          </Link>
        </div>
      </div>
      {/* 상품추가되었을때 푸터 팝업 */}
      <ActiveAddToCart />
    </div>
  );
}
