import {
  GetMemberAddressListService,
  GetMemberByIdService,
} from "@/Services/MemberService";
import { AddressType } from "@/Types/Address.Types";
import { MemberType } from "@/Types/Member.Types";
import { getResultData } from "@/Utils";
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
      if (result.IsSuccess) {
        const getMemberAddressList = await GetMemberAddressListService({
          memberId: (result.Data as MemberType).Id,
        });
        const memberResult: MemberType = {
          ...(result.Data as MemberType),
          addresses: getResultData(getMemberAddressList, "List") as
            | AddressType[]
            | undefined,
        };
        set({
          selectedMember: result.IsSuccess ? memberResult : null,
        });
      }
    } else {
      set({ selectedMember: null });
    }
  },
}));
