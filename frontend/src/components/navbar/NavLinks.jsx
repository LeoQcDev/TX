import { memo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export const NavLinks = memo(function NavLinks({
  currentLinks,
  pathname,
  handleNavigation,
}) {
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
                prefetch={true}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(link.href);
                }}
                className={`hover:underline transition-all duration-200 ${
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
});
