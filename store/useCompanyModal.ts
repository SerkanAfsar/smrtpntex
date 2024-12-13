import { CompanyType } from "@/Types/Company.Types";
import { create } from "zustand";

interface CompanyModal {
  isOpened: boolean;
  toggleOpened: () => void;
  setSelectedCompany: (id?: number) => void;

  selectedId?: number | null;
}

export const useCompanyModal = create<CompanyModal>()((set) => ({
  isOpened: false,
  toggleOpened: () => set((state) => ({ isOpened: !state.isOpened })),
  setSelectedCompany: async (id?: number) =>
    set((state) => ({ selectedId: id })),
}));
