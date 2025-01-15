import { cn } from "@/Utils";
import * as React from "react";

export type CustomRadioButtonInputRef = {
  getValue: () => string;
};

type CustomRadioButton = {
  title: string;
  value: string;
};

export type CustomRadioButtonListGroupProps =
  React.HTMLAttributes<HTMLDivElement> & {
    options: CustomRadioButton[];
    name: string;
    setSelectedType: any;
    selectedType: string;
  };

const CustomRadioButtonListGroup = React.forwardRef<
  CustomRadioButtonInputRef,
  CustomRadioButtonListGroupProps
>(
  (
    { className, options, setSelectedType, selectedType, name, ...rest },
    ref,
  ) => {
    const elementRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => ({
      getValue: () => {
        return "";
      },
    }));
    return (
      <div
        ref={elementRef}
        className={cn("flex items-center justify-start gap-6", className)}
        {...rest}
      >
        {options?.map((option) => (
          <label
            className="flex cursor-pointer items-center gap-2 text-sm"
            key={option.value as string}
          >
            <input
              type="radio"
              name={name}
              className="h-5 w-5"
              value={option.value}
              checked={selectedType == option.value}
              onChange={() => setSelectedType(option.value as string)}
            />
            {option.value}
          </label>
        ))}
      </div>
    );
  },
);
CustomRadioButtonListGroup.displayName = "CustomRadioButtonListGroup";

export default CustomRadioButtonListGroup;
