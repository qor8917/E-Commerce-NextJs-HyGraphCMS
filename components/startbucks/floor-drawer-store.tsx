'use client';
import useStore from '@/store';
import useBranchStore from '@/store/store-branch';
import Image from 'next/image';

export default function FloorDrawerStore() {
  const currentBranch = useStore(
    useBranchStore,
    (state) => state.currentBranch
  );

  return (
    <>
      <div className="flex items-center justify-between border-b-2 border-b-whitesmoke border-opacity-80 leading-5 text-white max-md:flex-auto ">
        <div>
          <span className=" mr-2 opacity-80">
            {currentBranch && currentBranch
              ? 'Pickup Store'
              : 'For item availability'}
          </span>
          <span className=" font-semibold max-sm:font-normal">
            {currentBranch && currentBranch
              ? `${currentBranch.title} ${currentBranch.dist} Km`
              : 'Choose a store'}
          </span>
        </div>

        <div className="ml-4 flex-none pt-1">
          <Image
            src="/down_arrow_white.svg"
            alt="down-arrow"
            width={24}
            height={24}
          />
        </div>
      </div>
    </>
  );
}
