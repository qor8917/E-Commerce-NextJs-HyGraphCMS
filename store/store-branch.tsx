import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface State {
  currentBranch: any | null;
  setCurrentBranch: (product: any) => void;
  branchId: string | null;
  setBranchId: (id: string) => void;
  callBackUrl: string[];
  setCallBackUrl: (url: any) => void;
}

const useBranchStore = create<State>()(
  persist(
    immer((set) => ({
      currentBranch: null,
      setCurrentBranch: (product: any) => {
        set(() => ({
          currentBranch: product,
        }));
      },
      branchId: null,
      setBranchId: (id: string) => {
        set(() => ({ lineId: id }));
      },
      callBackUrl: [],
      setCallBackUrl: (url: string) => {
        set(({ callBackUrl }) => {
          const prev = callBackUrl[callBackUrl.length - 1];
          return {
            callBackUrl: [...[prev], url],
          };
        });
      },
    })),
    { name: 'branch-storage' }
  )
);

export default useBranchStore;
