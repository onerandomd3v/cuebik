import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cuebik | Bank Dashboard",
  description: "Staff workflows and authoritative banking data will be implemented in separately reviewed changes.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
