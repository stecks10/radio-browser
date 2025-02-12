"use client";

import { Menu } from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  categories: string[];
}

const Sidebar = ({ categories }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed lg:hidden top-4 left-4 p-2 bg-gray-800 text-white rounded-md z-50"
      >
        <Menu />
      </button>

      <aside
        className={`fixed lg:relative lg:translate-x-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-200 ease-in-out w-64 bg-gray-800 p-4 space-y-4 h-screen z-40`}
      >
        <h2 className="text-2xl font-bold text-white text-end">Menu</h2>
        <ul className="space-y-2 mt-6">
          {categories.map((category) => (
            <li
              key={category}
              className="cursor-pointer hover:bg-gray-700 p-2 rounded-md text-white"
            >
              {category}
            </li>
          ))}
        </ul>
      </aside>

      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
        ></div>
      )}
    </>
  );
};

export default Sidebar;
