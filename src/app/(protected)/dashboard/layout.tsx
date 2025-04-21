'use client';

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
import { Sidebar, Navbar } from "./components";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <div className="flex">
            <Sidebar />
            <div className="flex flex-col flex-1">
              <Navbar/>
              <main className="flex-1 p-6 bg-gray-50 min-h-screen">
                {children}
              </main>
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
