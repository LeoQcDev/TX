"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useNavigation } from "@/contexts/NavigationContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [showConfigMenu, setShowConfigMenu] = useState(false);
  const configMenuRef = useRef(null);
  const pathname = usePathname();
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currentLinks = sectionsLinks[currentSection] || [];

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
          <NavLinks currentLinks={currentLinks} pathname={pathname} />
        </div>
        <ConfigMenu
          ref={configMenuRef}
          showConfigMenu={showConfigMenu}
          setShowConfigMenu={setShowConfigMenu}
          configLinks={sectionsLinks["Configuracion"]}
        />
      </div>
    </nav>
  );
}

function NavLinks({ currentLinks, pathname }) {
  return (
    <div className="hidden md:flex space-x-4 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentLinks.join(",")}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="flex space-x-4"
        >
          {currentLinks.map((link) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Link
                href={link.href}
                className={`hover:underline ${
                  pathname === link.href ? "font-bold" : ""
                }`}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ConfigMenu({ showConfigMenu, setShowConfigMenu, configLinks }) {
  return (
    <div className="relative">
      <button
        className="flex items-center space-x-1 hover:underline"
        onClick={() => setShowConfigMenu(!showConfigMenu)}
      >
        <span>Configuración</span>
        <ChevronDown className="h-4 w-4" />
      </button>
      <AnimatePresence>
        {showConfigMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
          >
            {configLinks?.map((link) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={link.href}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowConfigMenu(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
