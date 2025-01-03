import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TMS",
  description: "A global Digital Studio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon.ico" />
      </head>
      <body className={` antialiased custom-scroll`}>{children}</body>
    </html>
  );
}
