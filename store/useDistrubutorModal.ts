import { DistrubitorType } from "@/Types/Distrubitor.Types";
import { create } from "zustand";

interface DistrubutorModal {
  isOpened: boolean;
  toggleOpened: () => void;
  selectedId?: number | null;
  setSelectedDistributor: (id?: number) => void;
}

export const useDistrubutorModal = create<DistrubutorModal>()((set) => ({
  isOpened: false,
  toggleOpened: () => set((state) => ({ isOpened: !state.isOpened })),
  setSelectedDistributor: async (id?: number) =>
    set((state) => ({ selectedId: id })),
}));
