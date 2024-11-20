"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { sectionsLinks } from "@/config/navigation";

const NavigationContext = createContext();

export const useNavigation = () => useContext(NavigationContext);

export const NavigationProvider = ({ children }) => {
  const [currentSection, setCurrentSection] = useState("TECNOTEX");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const section = pathname.split("/")[1];
    if (section) {
      setCurrentSection(section.charAt(0).toUpperCase() + section.slice(1));
    } else {
      setCurrentSection("TECNOTEX");
    }
  }, [pathname]);

  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);

  return (
    <NavigationContext.Provider
      value={{
        currentSection,
        sectionsLinks,
        isSidebarCollapsed,
        toggleSidebar,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
