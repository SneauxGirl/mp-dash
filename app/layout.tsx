import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.scss";
import "../styles/layout.scss";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MrPops Dashboard",
  description: "Mr. Pops management dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
