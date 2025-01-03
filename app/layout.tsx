import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const layGrotesk   = localFont({
  src: [
    { path: "../public/font/LG-Regular.otf", weight: "400" },
    { path: "../public/font/LG-Medium.otf", weight: "500" },
    { path: "../public/font/LG-Semibold.otf", weight: "600" },
    { path: "../public/font/LG-Bold.otf", weight: "700" },
  ],
});

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
      <body className={` antialiased custom-scroll ${layGrotesk.className}`}>{children}</body>
    </html>
  );
}
