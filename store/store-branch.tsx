import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface State {
  currentBranch: any | null;
  setCurrentBranch: (product: any) => void;
  branchId: string | null;
  setBranchId: (id: string) => void;
  loaderInstance: any;
  setLoader: (loader: any) => void;
}

const useBranchStore = create<State>()(
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
    loaderInstance: null,
    setLoader: (loader: any) => {
      set(() => ({ loaderInstance: loader }));
    },
  }))
);

export default useBranchStore;
