import LoginBaseComponent from "@/Components/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smartpoint Admin Giriş",
};

export default function Login() {
  return (
    <div className="flex h-full min-h-screen w-full items-center justify-center bg-[#e5e5e5]">
      <LoginBaseComponent />
    </div>
  );
}
