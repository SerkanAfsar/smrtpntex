import React from "react";

export default function ContentWithInfoSection({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-auto flex-col overflow-auto overscroll-contain">
      {children}
    </div>
  );
}
