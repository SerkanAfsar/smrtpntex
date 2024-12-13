"use client";
import * as GridRoot from "gridjs-react";
import * as React from "react";
import "gridjs/dist/theme/mermaid.css";
import { html } from "gridjs";
import { PaginationType, ResponseResult } from "@/Types/Common.Types";

type CustomGridPropsType = React.ComponentPropsWithoutRef<
  typeof GridRoot.Grid
> & {
  isCheckbox?: boolean;
  convertAction?: any;
  apiUrl?: string;
  keywords?: string;
};

const CustomGrid = React.forwardRef<
  React.ElementRef<typeof GridRoot.Grid>,
  CustomGridPropsType
>(
  (
    { children, isCheckbox, convertAction, keywords, columns, apiUrl, ...rest },
    ref,
  ) => {
    let cols = columns;

    if (isCheckbox) {
      cols = [
        {
          name: html(`<input type="checkbox" class="w-4 h-4" />`),
          formatter: (cell: any) =>
            html(`<input type="checkbox" class="w-4 h-4" />`),
        },
        ...cols,
      ];
    }

    return (
      <div className="flex w-full flex-col gap-3">
        {children}
        <GridRoot.Grid
          ref={ref}
          {...rest}
          columns={cols}
          pagination={{
            limit: 10,
            server: {
              url: (prev, page, limit) =>
                `${prev}?pageIndex=${page + 1}&pageSize=${limit}&keywords=${keywords}`,
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
