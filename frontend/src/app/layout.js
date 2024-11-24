"use client";

import { useState } from "react";
import { Inter } from "next/font/google";
import { NavigationProvider } from "@/contexts/NavigationContext";
import { Providers } from "./providers";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/Sidebar";
import PageContent from "@/components/PageContent";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setIsSidebarCollapsed(prev => !prev);

  return (
    <html lang="es">
      <body className={`${inter.className} flex h-screen bg-gray-100`}>
        <Providers>
          <NavigationProvider>
            <Sidebar
              isCollapsed={isSidebarCollapsed}
              onToggle={toggleSidebar}
            />

            {/* Contenedor principal con flex-col para apilar los divs */}
            <div className="flex flex-col flex-1">
              {/* Navbar en un div separado */}
              <div className="flex-shrink-0">
                <Navbar />
              </div>

              {/* PageContent en otro div separado */}
              <div className="flex-1 overflow-hidden overflow-y-auto">
                <TooltipProvider>
                  <PageContent>{children}</PageContent>
                </TooltipProvider>
              </div>
            </div>
          </NavigationProvider>
        </Providers>
      </body>
    </html>
  );
}
