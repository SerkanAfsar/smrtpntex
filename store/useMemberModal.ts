import { GetMemberByIdService } from "@/Services/MemberService";
import { MemberType } from "@/Types/Member.Types";
import { create } from "zustand";

interface MemberModal {
  isOpened: boolean;
  toggleOpened: (open: boolean) => void;
  setSelectedMember: (id?: number) => Promise<void>;
  selectedMember: MemberType | null;
  isUpdated: boolean;
  setisUpdated: () => void;
}

export const useMemberModal = create<MemberModal>()((set) => ({
  isOpened: false,
  isUpdated: false,
  setisUpdated: () => set((state) => ({ isUpdated: !state.isUpdated })),
  toggleOpened: (open: boolean) => set((state) => ({ isOpened: open })),
  selectedMember: null,
  setSelectedMember: async (id?: number) => {
    if (id) {
      const result = await GetMemberByIdService({ id });
      set({
        selectedMember: result.IsSuccess ? (result.Data as MemberType) : null,
      });
    } else {
      set({ selectedMember: null });
    }
  },
}));
