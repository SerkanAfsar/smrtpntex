import { GetProductById } from "@/Services/ProductService";
import { ProductType } from "@/Types/Product.Types";
import { create } from "zustand";

interface ProductModal {
  isOpened: boolean;
  toggleOpened: () => void;
  setSelectedProduct: (id?: number) => Promise<void>;
  selectedProduct?: ProductType | null;
  setIsUpdated: () => void;
  isUpdated: boolean;
}

export const useProductModal = create<ProductModal>()((set) => ({
  isOpened: false,
  toggleOpened: () => set((state) => ({ isOpened: !state.isOpened })),
  setSelectedProduct: async (id?: number) => {
    if (id) {
      const result = await GetProductById({ id });
      set({
        selectedProduct: result.IsSuccess ? (result.Data as ProductType) : null,
      });
    } else {
      set({ selectedProduct: null });
    }
  },
  setIsUpdated: () => set((state) => ({ isUpdated: !state.isUpdated })),
  isUpdated: false,
}));
