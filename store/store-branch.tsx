import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface State {
  currentBranch: any | null;
  setCurrentBranch: (product: any) => void;
  branchId: string | null;
  setBranchId: (id: string) => void;
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
  }))
);

export default useBranchStore;
