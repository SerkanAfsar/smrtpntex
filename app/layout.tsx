import type { Metadata } from "next";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Smartpoint Admin",
  description: "SmartPoint Admin",
};
const inter = Inter({
  subsets: ["latin"],
  weight: ["500", "600", "700", "100", "200", "300", "400", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning={true}>
      <body className={`${inter.className} antialiased`}>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
