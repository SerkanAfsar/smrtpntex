import {
  GetCompanyAddressListService,
  GetCompanyByIdService,
} from "@/Services/CompanyService";
import { AddressType } from "@/Types/Address.Types";
import { CompanyType } from "@/Types/Company.Types";
import { getResultData } from "@/Utils";
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
      if (result.IsSuccess) {
        const getCompanyAddressList = await GetCompanyAddressListService({
          companyId: (result.Data as CompanyType).Id,
        });
        const companyResult: CompanyType = {
          ...(result.Data as CompanyType),
          addresses: getResultData(getCompanyAddressList, "List") as
            | AddressType[]
            | undefined,
        };
        set({
          selectedCompany: result.IsSuccess ? companyResult : null,
        });
      }
    } else {
      set({ selectedCompany: null });
    }
  },
}));
