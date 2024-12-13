import { create } from "zustand";

interface LeftMenuSide {
  isOpened: boolean;
  toggleOpened: (val: boolean) => void;
}

export const useLeftMenuStore = create<LeftMenuSide>()((set) => ({
  isOpened: false,
  toggleOpened: (val: boolean) => set(() => ({ isOpened: val })),
}));
