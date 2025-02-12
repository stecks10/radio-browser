"use client";

import { Check, Menu as IconMenu } from "lucide-react";
import { useState } from "react";

interface MenuProps {
  categories: string[];
  favorites: string[];
  toggleFavorite: (category: string) => void;
}

const Menu = ({ categories, favorites, toggleFavorite }: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleMenu}
        className="fixed top-4 left-4 p-2 bg-gray-800 text-white rounded-md z-50 lg:hidden"
      >
        <IconMenu size={24} />
      </button>

      <aside
        className={`fixed lg:relative transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-200 ease-in-out w-64 bg-gray-800 p-4 space-y-4 h-screen z-40`}
      >
        <h2 className="text-2xl font-bold text-white text-end">Menu</h2>
        <ul className="space-y-2 mt-6">
          {categories.map((category) => (
            <li
              key={category}
              className="cursor-pointer hover:bg-gray-700 p-2 rounded-md text-white flex items-center justify-between"
            >
              <div
                className="ml-1 cursor-pointer flex items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(category);
                }}
              >
                <span className="mr-2">{category}</span>

                {favorites.includes(category) && (
                  <Check
                    size={26}
                    className="text-green-500 border-2 border-white p-1 rounded"
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {isOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
        ></div>
      )}
    </>
  );
};

export default Menu;
