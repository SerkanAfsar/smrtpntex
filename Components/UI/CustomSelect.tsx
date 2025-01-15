import { CustomOptionsType } from "@/Types/Common.Types";
import { cn } from "@/Utils";
import * as React from "react";

type CustomSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: CustomOptionsType[];
  isFull?: boolean;
  title?: string;
  err?: string;
  name?: string;
  setFirst?: boolean;
  subTitle?: string;
  outerClass?: string;
};

const CustomSelect = React.forwardRef<HTMLSelectElement, CustomSelectProps>(
  (
    {
      className,
      isFull,
      name,
      onChange,
      setFirst = false,
      onBlur,
      err,
      title,
      options,
      subTitle,
      outerClass,
      ...rest
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          "relative flex flex-col items-start justify-start gap-2",
          isFull ? "w-full" : "w-auto",
          outerClass && outerClass,
        )}
      >
        {title && (
          <label htmlFor={name} className="block text-left text-xs font-normal">
            {title}
          </label>
        )}
        <select
          onChange={onChange}
          onBlur={onBlur}
          className={cn(
            "block w-full border-gray-300 text-sm outline-none",
            err && "border-red-700",
            className,
          )}
          name={name}
          id={name}
          ref={ref}
          {...rest}
        >
          {setFirst && <option value="">{subTitle} Seçiniz</option>}
          {options?.map((op, index) => (
            <option value={op.value} key={index}>
              {op.name}
            </option>
          ))}
        </select>
        {err && (
          <span className="block self-start text-xs text-red-700">{err}</span>
        )}
      </div>
    );
  },
);
CustomSelect.displayName = "CustomSelect";
export default CustomSelect;
