import { Product } from '@/types/types';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface State {
  currentProduct: Product | null;
  setCurrentProduct: (product: Product) => void;
  currentOption: Record<string, string | number>[] | null;
  setCurrentOption: (option: Record<string, string | number>[] | null) => void;
  lineId: string | null;
  setLineId: (id: string) => void;
}

const useProductStore = create<State>()(
  immer((set) => ({
    currentProduct: null,
    currentOption: null,
    setCurrentProduct: (product: Product) => {
      set(() => ({
        currentProduct: product,
      }));
    },
    setCurrentOption: (options: Record<string, string | number>[] | null) => {
      set(() => ({ currentOption: options }));
    },
    lineId: null,
    setLineId: (id: string) => {
      set(() => ({ lineId: id }));
    },
  }))
);

export default useProductStore;
