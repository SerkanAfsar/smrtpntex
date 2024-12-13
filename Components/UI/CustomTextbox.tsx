import { cn } from "@/Utils";
import Image from "next/image";
import * as React from "react";

const CustomTextbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    err?: string;
    isFull?: boolean;
    icon?: any;
    title?: string;
  }
>(
  (
    {
      className,
      onChange,
      onBlur,
      type,
      name,
      title,
      err,
      icon,
      isFull = true,
      ...rest
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          "relative flex flex-col items-start justify-start gap-2",
          isFull ? "w-full" : "w-auto",
        )}
      >
        {title && (
          <label className="block text-left text-xs font-normal" htmlFor={name}>
            {title}
          </label>
        )}
        {icon && (
          <Image
            src={icon}
            width={20}
            height={20}
            alt="Smartpoint"
            className="absolute left-3 top-[50%] -translate-y-[50%]"
          />
        )}
        <input
          type={type}
          ref={ref}
          name={name}
          id={name}
          onChange={onChange}
          onBlur={onBlur}
          className={cn(
            "block w-full border-gray-300 text-sm",
            err && "border-red-700",
            className,
          )}
          {...rest}
        />
        {err && (
          <span className="block self-start text-xs text-red-700">{err}</span>
        )}
      </div>
    );
  },
);
CustomTextbox.displayName = "CustomTextBox";

export { CustomTextbox };
