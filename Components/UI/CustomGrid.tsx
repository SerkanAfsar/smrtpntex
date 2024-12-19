"use client";
import { Grid } from "gridjs-react";
import * as React from "react";
import "gridjs/dist/theme/mermaid.css";
import { html } from "gridjs";

import { PaginationType, ResponseResult } from "@/Types/Common.Types";

type CustomGridPropsType = React.ComponentPropsWithoutRef<typeof Grid> & {
  isCheckbox?: boolean;
  convertAction?: any;
  apiUrl?: string;
  keywords?: string;
  startDate?: string;
  endDate?: string;
};

const CustomGrid = React.forwardRef<
  React.ElementRef<typeof Grid>,
  CustomGridPropsType
>(
  (
    {
      children,
      isCheckbox,
      startDate,
      endDate,
      convertAction,
      keywords,
      columns,
      apiUrl,
      ...rest
    },
    ref,
  ) => {
    let cols = columns;

    if (isCheckbox) {
      cols = [
        {
          id: "deneme",
          name: "deneme",
          formatter: () => html(`<i>Deneme</i>`),
          sort: false,
        },
        ...cols,
      ];
    }

    return (
      <div className="flex w-full flex-col gap-3">
        {children}
        <Grid
          ref={ref}
          {...rest}
          columns={cols}
          language={{
            pagination: {
              previous: "Önceki",
              next: "Sonraki",
              showing: " ",
              results: " veri gösteriliyor",
              to: " ",
              of: "/",
            },
            search: {
              placeholder: "Arama yapın...",
            },
          }}
          pagination={{
            limit: 10,
            server: {
              url: (prev, page, limit) =>
                `${prev}?pageIndex=${page + 1}&pageSize=${limit}&keywords=${keywords}&startDate=${startDate}&endDate=${endDate}`,
            },
          }}
          server={{
            url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/${apiUrl}`,
            then: (data) => {
              const result: ResponseResult<any> = data;
              if (result.IsSuccess) {
                const dataResult = result.Data as PaginationType<any>;
                return convertAction(dataResult.records);
              }
            },
            total: (data) => {
              const dataResult = data.Data as PaginationType<any>;
              return dataResult.totalCount;
            },
          }}
        />
      </div>
    );
  },
);

CustomGrid.displayName = "CustomGrid";
export default CustomGrid;
