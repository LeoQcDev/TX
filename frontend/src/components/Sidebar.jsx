// @/compponents/Sidebar.jsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigation } from "@/contexts/NavigationContext";
import { menuItems } from "@/config/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const { isSidebarCollapsed, toggleSidebar } = useNavigation();

  return (
    <aside
      className={`bg-grayTX text-white transition-all duration-300 ease-in-out ${
        isSidebarCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex justify-between items-center p-4">
        <h2
          className={`font-bold text-xl ${
            isSidebarCollapsed ? "hidden" : "block"
          }`}
        >
          Áreas
        </h2>
        <button
          onClick={toggleSidebar}
          className="text-white p-2 rounded-full hover:bg-gray-500 hover:bg-opacity-40 focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          {isSidebarCollapsed ? (
            <ChevronRight size={24} />
          ) : (
            <ChevronLeft size={24} />
          )}
        </button>
      </div>
      <nav>
        <ul>
          {menuItems.map(({ icon: Icon, text, href }) => (
            <li key={text}>
              <Link href={href}>
                <div
                  className={`flex items-center px-4 py-2 hover:bg-gray-500 hover:bg-opacity-40 ${
                    pathname.startsWith(href) ? "bg-gray-500 bg-opacity-40" : ""
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span
                    className={`ml-3 ${
                      isSidebarCollapsed ? "hidden" : "block"
                    }`}
                  >
                    {text}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
