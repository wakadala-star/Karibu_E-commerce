import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Karibu - Give All You Need",
  description: "Your one-stop shop for electronics, home, music, and phone accessories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
