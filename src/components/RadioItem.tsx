"use client";

import { Pen, Play, Trash } from "lucide-react";
import { Button } from "./ui/button";

interface RadioItemProps {
  name: string;
  description: string;
  country: string;
}

const RadioItem = ({ name, description, country }: RadioItemProps) => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 rounded-md">
      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p>{country}</p>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
      <div className="flex space-x-2">
        <Button className="p-2 rounded-full bg-gray-700 text-gray-400">
          <Play />
        </Button>
        <Button className="p-2 rounded-full bg-gray-700 text-gray-400">
          <Pen />
        </Button>
        <Button className="p-2 rounded-full bg-gray-700 text-gray-400">
          <Trash />
        </Button>
      </div>
    </div>
  );
};

export default RadioItem;
