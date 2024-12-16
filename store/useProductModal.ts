import { create } from "zustand";

interface ProductModal {
  isOpened: boolean;
  toggleOpened: () => void;
  setSelectedProduct: (id?: number) => void;
  selectedId?: number | null;
}

export const useProductModal = create<ProductModal>()((set) => ({
  isOpened: false,
  toggleOpened: () => set((state) => ({ isOpened: !state.isOpened })),
  setSelectedProduct: async (id?: number) =>
    set((state) => ({ selectedId: id })),
}));
