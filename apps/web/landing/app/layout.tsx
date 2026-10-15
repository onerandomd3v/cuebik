import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cuebik | Banking Intelligence and Engagement",
  description: "This standalone landing application is ready for approved product content and design implementation.",
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
