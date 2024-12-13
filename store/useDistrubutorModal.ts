import { DistrubitorType } from "@/Types/Distrubitor.Types";
import { create } from "zustand";

interface DistrubutorModal {
  isOpened: boolean;
  toggleOpened: () => void;
  setDistributorValues: (id: number) => Promise<Partial<DistrubitorType>>;
}

export const useDistrubutorModal = create<DistrubutorModal>()((set) => ({
  isOpened: false,
  toggleOpened: () => set((state) => ({ isOpened: !state.isOpened })),
  setDistributorValues: async (id: number) => {
    return new Promise<Partial<DistrubitorType>>((resolve) =>
      resolve({
        Id: id,
      }),
    );
  },
}));
