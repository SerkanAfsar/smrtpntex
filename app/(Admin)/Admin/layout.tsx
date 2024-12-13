import LeftSection from "@/Components/Admin/LeftSection";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full">
      <LeftSection />
      <div className="flex flex-1">{children}</div>
    </div>
  );
}
