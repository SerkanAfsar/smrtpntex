import { PaginationType, ResponseResult } from "@/Types/Common.Types";
import { ExcelType } from "@/Types/Excel.Types";
import { create } from "zustand";

export const useExcel = create<ExcelType>()((set) => ({
  data: async (fetchFunc: any) => {
    const result: ResponseResult<any> = await fetchFunc({
      searchType: { pageIndex: 1, pageSize: 99999 },
    });

    if (result.IsSuccess) {
      const data = result.Data as PaginationType<any>;
      return data.records as any[];
    }
    return [];
  },
}));
