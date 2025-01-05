import { GetMemberByIdService } from "@/Services/MemberService";
import { MemberType } from "@/Types/Member.Types";
import { create } from "zustand";

interface PriceModal {
  isOpened: boolean;
  toggleOpened: (open: boolean) => void;
  setSelectedPrice: (id?: number) => Promise<void>;
  selectedPrice: MemberType | null;
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
      const result = await GetMemberByIdService({ id });
      set({
        selectedPrice: result.IsSuccess ? (result.Data as MemberType) : null,
      });
    } else {
      set({ selectedPrice: null });
    }
  },
}));
