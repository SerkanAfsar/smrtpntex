import { CarBrandType } from "@/Types/Car.Types";
import { create } from "zustand";

interface CarBrandModal {
  isOpened: boolean;
  toggleOpened: (open: boolean) => void;
  setSelectedBrand: (id?: number) => Promise<void>;
  selectedBrand: CarBrandType | null;
}

export const useCarBrandModal = create<CarBrandModal>()((set) => ({
  isOpened: false,
  toggleOpened: (open: boolean) => set((state) => ({ isOpened: open })),
  selectedBrand: null,
  setSelectedBrand: async (id?: number) => {
    // if (id) {
    //   const result = await GetCompanyByIdService({ id });
    //   set({
    //     selectedCompany: result.IsSuccess ? (result.Data as CompanyType) : null,
    //   });
    // } else {
    //   set({ selectedCompany: null });
    // }
    set({ selectedBrand: null });
  },
}));
