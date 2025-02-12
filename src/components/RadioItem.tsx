"use client";

import { useState } from "react";
import { Pen, Play, Trash } from "lucide-react";
import { Button } from "./ui/button";
import EditRadioModal from "./EditRadioModal";

interface RadioItemProps {
  name: string;
  country: string;
  onRemoveFavorite: () => void;
  onUpdateRadio: (updatedRadio: { name: string; country: string }) => void;
}

const RadioItem = ({
  name,
  country,
  onRemoveFavorite,
  onUpdateRadio,
}: RadioItemProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleSave = (updatedRadio: { name: string; country: string }) => {
    onUpdateRadio(updatedRadio);
  };

  return (
    <>
      <div className="flex justify-between items-center p-4 bg-gray-800 rounded-md">
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p>{country}</p>
        </div>
        <div className="flex space-x-2">
          <Button className="p-2 rounded-full bg-gray-700 text-gray-400">
            <Play />
          </Button>
          <Button
            className="p-2 rounded-full bg-gray-700 text-gray-400"
            onClick={handleEdit}
          >
            <Pen />
          </Button>
          <Button
            className="p-2 rounded-full bg-gray-700 text-gray-400"
            onClick={onRemoveFavorite}
          >
            <Trash />
          </Button>
        </div>
      </div>
      <div className="border-zinc-400">
        {" "}
        {isEditModalOpen && (
          <EditRadioModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleSave}
            radio={{ name, country }}
          />
        )}
      </div>
    </>
  );
};

export default RadioItem;
