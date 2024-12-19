import { create } from "zustand";

interface UserModal {
  isOpened: boolean;
  toggleOpened: () => void;
  selectedId?: number | null;
  setSelectedUser: (id?: number) => void;
  updated: boolean;
  setUpdated: () => void;
}

export const useUserModal = create<UserModal>()((set) => ({
  isOpened: false,
  toggleOpened: () => set((state) => ({ isOpened: !state.isOpened })),
  setSelectedUser: async (id?: number | null) =>
    set((state) => ({ selectedId: id })),
  updated: false,
  setUpdated: () => set((state) => ({ updated: !state.updated })),
}));
