import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KHID Graduation Exhibition",
  description:
    "경희대학교 산업디자인학과 졸업전시. Kyung Hee University Industrial Design graduation exhibition.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
