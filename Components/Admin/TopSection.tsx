import { cn } from "@/Utils";
import * as React from "react";
// export default function AdminTopSection({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <section
//       className={cn(
//         "flex items-center justify-between border-b bg-white px-6 py-4 transition-all",
//       )}
//     >
//       {children}
//     </section>
//   );
// }

const AdminTopSection = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, children, ...rest }, ref) => {
  return (
    <section
      ref={ref}
      className={cn(
        "flex items-center justify-between border-b bg-white px-6 py-4 transition-all",
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  );
});
AdminTopSection.displayName = "AdminTopSection";
export default AdminTopSection;
