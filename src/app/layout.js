"use client";

import { Inter } from "next/font/google";

import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { SWRConfig } from "swr";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 30_000 }}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </SWRConfig>
  );
}
