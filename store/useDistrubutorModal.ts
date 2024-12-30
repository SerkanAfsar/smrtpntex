import { GetDistributorByIdService } from "@/Services/DistrubitorsService";
import { DistrubitorType } from "@/Types/Distrubitor.Types";
import { create } from "zustand";

// interface DistrubutorModal {
//   isOpened: boolean;
//   toggleOpened: () => void;
//   selectedId?: number | null;
//   setSelectedDistributor: (id?: number) => void;
// }

interface DistrubutorModal {
  isOpened: boolean;
  toggleOpened: (open: boolean) => void;
  setSelectedDistributor: (id?: number) => Promise<void>;
  selectedDistributor: DistrubitorType | null;
}

export const useDistrubutorModal = create<DistrubutorModal>()((set) => ({
  isOpened: false,
  toggleOpened: (open: boolean) => set((state) => ({ isOpened: open })),
  selectedDistributor: null,
  setSelectedDistributor: async (id?: number) => {
    if (id) {
      const result = await GetDistributorByIdService({ id });
      set({
        selectedDistributor: result.IsSuccess
          ? (result.Data as DistrubitorType)
          : null,
      });
    } else {
      set({ selectedDistributor: null });
    }
  },
}));
