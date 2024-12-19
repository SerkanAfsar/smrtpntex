import { cn } from "@/Utils";
import * as React from "react";

type CustomCheckboxType = React.HTMLAttributes<HTMLInputElement> & {
  title?: string;
  name?: string;
};

export const CustomCheckbox = React.forwardRef<
  HTMLInputElement,
  CustomCheckboxType
>(({ className, onChange, onBlur, name, title, ...rest }, ref) => {
  const id = React.useId();
  return (
    <div
      className={cn("relative flex w-full items-center justify-start gap-2")}
    >
      <input
        type="checkbox"
        ref={ref}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        id={id}
        className={cn("h-4 w-4", className)}
        {...rest}
      />
      {title && (
        <label htmlFor={id} className="text-sm">
          {title}
        </label>
      )}
    </div>
  );
});
CustomCheckbox.displayName = "CustomCheckbox";

export default CustomCheckbox;
