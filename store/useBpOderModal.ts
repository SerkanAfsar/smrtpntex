import { create } from "zustand";

interface BpModal {
  isOpened: boolean;
  toggleOpened: () => void;
  setSelectedBpOrder: (id?: number) => void;
  selectedId?: number | null;
  updated: boolean;
  setUpdated: () => void;
}

export const useBpOrderModal = create<BpModal>()((set) => ({
  isOpened: false,
  toggleOpened: () => set((state) => ({ isOpened: !state.isOpened })),
  setSelectedBpOrder: async (id?: number) =>
    set((state) => ({ selectedId: id })),
  updated: false,
  setUpdated: () => set((state) => ({ updated: !state.updated })),
}));
