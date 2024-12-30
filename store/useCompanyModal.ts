import { GetCompanyByIdService } from "@/Services/CompanyService";
import { CompanyType } from "@/Types/Company.Types";
import { create } from "zustand";

interface CompanyModal {
  isOpened: boolean;
  toggleOpened: (open: boolean) => void;
  setSelectedCompany: (id?: number) => Promise<void>;
  selectedCompany: CompanyType | null;
}

export const useCompanyModal = create<CompanyModal>()((set) => ({
  isOpened: false,

  toggleOpened: (open: boolean) => set((state) => ({ isOpened: open })),
  selectedCompany: null,
  setSelectedCompany: async (id?: number) => {
    if (id) {
      const result = await GetCompanyByIdService({ id });
      set({
        selectedCompany: result.IsSuccess ? (result.Data as CompanyType) : null,
      });
    } else {
      set({ selectedCompany: null });
    }
  },
}));
