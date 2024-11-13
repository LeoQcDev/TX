import { memo, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ConfigMenu = memo(function ConfigMenu({
  showConfigMenu,
  setShowConfigMenu,
  configLinks,
  handleNavigation,
}) {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowConfigMenu(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && showConfigMenu) {
        setShowConfigMenu(false);
      }
    };

    if (showConfigMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [showConfigMenu, setShowConfigMenu]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="flex items-center space-x-1 hover:underline"
        onClick={() => setShowConfigMenu(!showConfigMenu)}
        aria-expanded={showConfigMenu}
        aria-haspopup="true"
        aria-label="Menú de configuración"
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
                  prefetch={true}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(link.href);
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
});
