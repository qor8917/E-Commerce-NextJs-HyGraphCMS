import { CartItem } from '@/types/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  currentCart: CartItem[];
  addCurrentCartItem: (line: CartItem) => void;
  removeCurrentCartItem: (id: string) => void;
  updateCurrentCartItem: (line: CartItem) => void;
}
const initialState: CartItem[] = [];
const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      currentCart: [],
      addCurrentCartItem: (line: CartItem) => {
        set(({ currentCart }) => ({
          currentCart: [...currentCart, line],
        }));
      },
      removeCurrentCartItem: (id: string) => {
        set(({ currentCart }) => ({
          currentCart: currentCart.filter((x) => x.id !== id),
        }));
      },
      updateCurrentCartItem: (line: CartItem) => {
        get().removeCurrentCartItem(line.id);
        get().addCurrentCartItem(line);
      },
    }),
    {
      name: 'cart-storage', // name of the item in the storage (must be unique)
    }
  )
);

export default useCartStore;
