import { cn } from "@/Utils";
import * as React from "react";
import Image from "next/image";

type CustomButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: any;
  title?: string;
  iconWidth?: number;
  iconHeight?: number;
};

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, type, icon, title, iconWidth, iconHeight, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "flex items-center justify-between rounded-md p-1.5 text-xs font-medium",
          className,
        )}
        {...rest}
      >
        {icon && (
          <Image
            src={icon}
            width={iconWidth ?? 20}
            height={iconHeight ?? 20}
            alt={title || "Smartpoint"}
          />
        )}
        {title && <span>{title}</span>}
      </button>
    );
  },
);
CustomButton.displayName = "CustomButton";
export default CustomButton;
