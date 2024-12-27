import { GetStationByIdService } from "@/Services/StationService";
import {
  GetAllQrCodeListByTankId,
  GetAllTanksByStationIdService,
} from "@/Services/TankService";
import { ResponseResult } from "@/Types/Common.Types";
import { StationType, TankQrType, TankType } from "@/Types/Station.Types";
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

    const qrListArr: TankQrType[] = [];
    if (tankListResponse.IsSuccess) {
      const tankList = tankListResponse.Data as TankType[];
      for (let i = 0; i < tankList.length; i++) {
        const tankElem = tankList[i];
        const tankQrResponse: ResponseResult<TankQrType> =
          await GetAllQrCodeListByTankId({
            tankId: tankElem.Id,
          });
        if (tankQrResponse.IsSuccess) {
          (tankQrResponse.Data as TankQrType[]).map((item) => {
            qrListArr.push(item);
          });
        }
      }
    }

    const newData: StationType = {
      ...(stationResponse.Data as StationType),
      tanks: (tankListResponse.Data as TankType[]).map((item) => ({
        ...item,
        tankQrList: qrListArr,
      })),
    };
    set({ selectedStation: newData });
  },
  updated: false,
  setUpdated: () => set((state) => ({ updated: !state.updated })),
}));
