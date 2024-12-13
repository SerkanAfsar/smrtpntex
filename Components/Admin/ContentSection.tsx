import { cn } from "@/Utils";
import * as React from "react";

type ContentSectionProps = React.HTMLAttributes<HTMLElement>;

const ContentSection = React.forwardRef<HTMLElement, ContentSectionProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <section
        className={cn(
          "flex flex-col bg-adminBgColor transition-all",
          className,
        )}
        ref={ref}
        {...rest}
      >
        {children}
      </section>
    );
  },
);
ContentSection.displayName = "ContentSection";

export default ContentSection;
