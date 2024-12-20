import { GetStationByIdService } from "@/Services/StationService";
import { GetAllTanksByStationIdService } from "@/Services/TankService";
import { StationType, TankType } from "@/Types/Station.Types";
import { create } from "zustand";

interface StationModal {
  isOpened: boolean;
  toggleOpened: () => void;
  selectedStation: StationType | null;
  setSelectedStation: (id?: number) => Promise<void>;
  updated: boolean;
  setUpdated: () => void;
}

export const useStationModal = create<StationModal>()((set) => ({
  isOpened: false,
  selectedStation: null,
  toggleOpened: () => set((state) => ({ isOpened: !state.isOpened })),
  setSelectedStation: async (id?: number | null) => {
    if (!id) {
      set({ selectedStation: null });
      return;
    }

    const [stationResponse, tankListResponse] = await Promise.all([
      GetStationByIdService({ id: Number(id) }),
      GetAllTanksByStationIdService({
        stationId: id as number,
      }),
    ]);

    if (!stationResponse.IsSuccess || !tankListResponse.IsSuccess) {
      set({ selectedStation: null });
      return;
    }

    const newData: StationType = {
      ...(stationResponse.Data as StationType),
      tanks: tankListResponse.Data as TankType[],
    };
    set({ selectedStation: newData });
  },
  updated: false,
  setUpdated: () => set((state) => ({ updated: !state.updated })),
}));
