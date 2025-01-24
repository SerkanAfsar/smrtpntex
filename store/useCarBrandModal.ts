import { GetCarBrandByIdService } from "@/Services/CarService";
import { CarBrandType } from "@/Types/Car.Types";
import { create } from "zustand";

interface CarBrandModal {
  isOpened: boolean;
  toggleOpened: (open: boolean) => void;
  setSelectedBrand: (id?: number) => Promise<void>;
  selectedBrand: CarBrandType | null;
  isUpdated: boolean;
  setIsUpdated: () => void;
}

export const useCarBrandModal = create<CarBrandModal>()((set) => ({
  isOpened: false,
  toggleOpened: (open: boolean) => set((state) => ({ isOpened: open })),
  selectedBrand: null,
  setSelectedBrand: async (id?: number) => {
    if (id) {
      const result = await GetCarBrandByIdService({ id });

      set({
        selectedBrand: result.IsSuccess ? (result.Data as CarBrandType) : null,
      });
    } else {
      set({ selectedBrand: null });
    }
  },
  isUpdated: false,
  setIsUpdated: () => set((state) => ({ isUpdated: !state.isUpdated })),
}));
