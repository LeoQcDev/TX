"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useNavigation } from "@/contexts/NavigationContext";
import { NavLinks } from "./NavLinks";
import { ConfigMenu } from "./ConfigMenu";

export default function Navbar() {
  const [showConfigMenu, setShowConfigMenu] = useState(false);
  const configMenuRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();
  const { currentSection, sectionsLinks } = useNavigation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        configMenuRef.current &&
        !configMenuRef.current.contains(event.target)
      ) {
        setShowConfigMenu(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && showConfigMenu) {
        setShowConfigMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [showConfigMenu]);

  const currentLinks = sectionsLinks[currentSection] || [];

  if (!Array.isArray(currentLinks)) {
    console.error(
      `Los enlaces para la sección ${currentSection} no son válidos`
    );
    return [];
  }

  const handleNavigation = (href) => {
    setShowConfigMenu(false);
    router.push(href);
  };

  return (
    <nav className="bg-blackRedTX text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <motion.span
            key={currentSection}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="font-bold text-xl capitalize"
          >
            {currentSection}
          </motion.span>
          <NavLinks
            currentLinks={currentLinks}
            pathname={pathname}
            handleNavigation={handleNavigation}
          />
        </div>
        <ConfigMenu
          ref={configMenuRef}
          showConfigMenu={showConfigMenu}
          setShowConfigMenu={setShowConfigMenu}
          configLinks={sectionsLinks["Configuración"]}
          handleNavigation={handleNavigation}
        />
      </div>
    </nav>
  );
}
