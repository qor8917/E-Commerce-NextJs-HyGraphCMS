import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface State {
  isOpen: boolean;
  handleIsOpen: (active: boolean) => void;
  isCalling: boolean;
  handleIsCalling: (active: boolean) => void;
}

const useActionStore = create<State>()(
  immer((set) => ({
    isOpen: false,
    handleIsOpen: (active: boolean) => {
      set((state: any) => {
        state.isOpen = active;
        // setTimeout(() => {
        //   set((state) => {
        //     state.isOpen = false;
        //   });
        // }, 2000);
      });
    },
    isCalling: false,
    handleIsCalling: (active: boolean) => {
      set((state: any) => {
        state.isCalling = active;
        setTimeout(() => {
          set((state) => {
            state.isCalling = false;
          });
        }, 2000);
      });
    },
  }))
);

export default useActionStore;
