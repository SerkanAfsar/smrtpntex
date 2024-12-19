import { create } from "zustand";

interface RoleModal {
  isOpened: boolean;
  toggleOpened: () => void;
  selectedId?: number | null;
  setSelectedRole: (id?: number) => void;
  updated: boolean;
  setUpdated: () => void;
}

export const useRoleModal = create<RoleModal>()((set) => ({
  isOpened: false,
  toggleOpened: () => set((state) => ({ isOpened: !state.isOpened })),
  setSelectedRole: async (id?: number | null) =>
    set((state) => ({ selectedId: id })),
  updated: false,
  setUpdated: () => set((state) => ({ updated: !state.updated })),
}));
