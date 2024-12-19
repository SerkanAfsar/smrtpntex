"use client";

import { PaginationType, ResponseResult } from "@/Types/Common.Types";

import { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";

export type CustomDataTableProps = {
  apiUrl?: string;
  keywords?: string;
  startDate?: string;
  endDate?: string;
  columns: any;
  updated?: boolean;
  isActive?: boolean;
  id?: number;
  gsm?: string;
};
export default function CustomDatatable({
  apiUrl,
  endDate,
  keywords,
  startDate,
  columns,
  updated,
  isActive,
  id,
  gsm,
}: CustomDataTableProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(10);

  const handleChange = useCallback(
    async ({ page }: { page: number }) => {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL as string;
      const newUrl = new URL(`${apiUrl}`, baseUrl);

      if (page) {
        newUrl.searchParams.append("pageIndex", page.toString());
      }
      if (perPage) {
        newUrl.searchParams.append("pageSize", perPage.toString());
      }
      if (keywords) {
        newUrl.searchParams.append("keywords", keywords.toString());
      }
      if (startDate) {
        newUrl.searchParams.append("startDate", startDate.toString());
      }
      if (endDate) {
        newUrl.searchParams.append("endDate", endDate.toString());
      }
      if (!!isActive || !isActive) {
        newUrl.searchParams.append("isActive", String(isActive));
      }
      if (id) {
        newUrl.searchParams.append("id", id.toString());
      }
      if (gsm) {
        newUrl.searchParams.append("gsm", gsm.toString());
      }

      const response = await fetch(newUrl.toString());
      const result: ResponseResult<PaginationType<any>> = await response.json();

      if (result.IsSuccess) {
        const data: PaginationType<any> = result.Data as PaginationType<any>;
        setData(data.records as any[]);
        setTotalRows(data.totalCount);
      } else {
        setData([]);
        setTotalRows(0);
      }
      setLoading(false);
    },
    [apiUrl, endDate, keywords, startDate, perPage, updated, isActive, id, gsm],
  );

  const handlePageChange = async (page: number) => {
    await handleChange({ page });
  };
  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setPerPage(newPerPage);
    await handleChange({ page });
  };
  useEffect(() => {
    handleChange({ page: 1 });
  }, [handleChange]);

  return (
    <div className="block h-full w-full flex-1">
      <DataTable
        columns={columns}
        data={data}
        progressPending={loading}
        progressComponent={<LoadingComponent />}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        className="custom-table"
        customStyles={{
          table: {
            style: {
              borderCollapse: "collapse",
              flex: 1,
              maxWidth: "100%",
            },
          },
        }}
        responsive
      />
    </div>
  );
}

function LoadingComponent() {
  return (
    <div className="text-md flex h-full w-full flex-1 items-center justify-center text-center">
      Yükleniyor...
    </div>
  );
}
