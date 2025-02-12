"use client";

import { HiSearch } from "react-icons/hi";
import { Input } from "../components/ui/input";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  return (
    <div className="relative mt-4 py-6">
      <Input
        type="text"
        className="w-full p-2 rounded-md bg-gray-700 text-white placeholder-gray-400"
        placeholder="Search here"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <HiSearch className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
};

export default SearchBar;
