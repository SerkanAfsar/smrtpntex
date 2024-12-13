import { CompanyType } from "@/Types/Company.Types";
import { create } from "zustand";

interface CompanyModal {
  isOpened: boolean;
  toggleOpened: () => void;
  setCompanyValues: (id: number) => Promise<Partial<CompanyType>>;
}

export const useCompanyModal = create<CompanyModal>()((set) => ({
  isOpened: false,
  toggleOpened: () => set((state) => ({ isOpened: !state.isOpened })),
  setCompanyValues: async (id: number) => {
    return new Promise<Partial<CompanyType>>((resolve) =>
      resolve({
        Id: id,
      }),
    );
  },
}));
