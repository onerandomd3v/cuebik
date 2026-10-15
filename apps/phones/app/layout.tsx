import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BankCue | Fictional Simulator",
  description: "Synthetic customer events and messages will appear here only after backend-backed integration is implemented.",
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
