import { GetProductById } from "@/Services/ProductService";
import { AddProductType } from "@/Types/Product.Types";
import { create } from "zustand";

interface ProductModal {
  isOpened: boolean;
  toggleOpened: (val: boolean) => void;
  setSelectedProduct: (id?: number) => Promise<void>;
  selectedProduct?: AddProductType | null;
  setIsUpdated: () => void;
  isUpdated: boolean;
}

export const useProductModal = create<ProductModal>()((set) => ({
  isOpened: false,
  toggleOpened: (val) => set(() => ({ isOpened: val })),
  setSelectedProduct: async (id?: number) => {
    if (id) {
      const result = await GetProductById({ id });
      set({
        selectedProduct: result.IsSuccess
          ? (result.Data as AddProductType)
          : null,
      });
    } else {
      set({ selectedProduct: null });
    }
  },
  setIsUpdated: () => set((state) => ({ isUpdated: !state.isUpdated })),
  isUpdated: false,
}));
