import { GetPriceByIdService } from "@/Services/PriceService";
import { PriceType } from "@/Types/Price.Types";
import { create } from "zustand";

interface PriceModal {
  isOpened: boolean;
  toggleOpened: (open: boolean) => void;
  setSelectedPrice: (id?: number) => Promise<void>;
  selectedPrice: PriceType | null;
  isUpdated: boolean;
  setisUpdated: () => void;
}

export const usePriceModal = create<PriceModal>()((set) => ({
  isOpened: false,
  isUpdated: false,
  setisUpdated: () => set((state) => ({ isUpdated: !state.isUpdated })),
  toggleOpened: (open: boolean) => set((state) => ({ isOpened: open })),
  selectedPrice: null,
  setSelectedPrice: async (id?: number) => {
    if (id) {
      const result = await GetPriceByIdService({ id });
      set({
        selectedPrice: result.IsSuccess ? (result.Data as PriceType) : null,
      });
    } else {
      set({ selectedPrice: null });
    }
  },
}));
