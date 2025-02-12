"use client";

import { useState, useRef } from "react";
import { Pen, Play, Trash, Pause } from "lucide-react";
import { Button } from "./ui/button";
import EditRadioModal from "./EditRadioModal";

interface RadioItemProps {
  name: string;
  country: string;
  url: string;
  onRemoveFavorite: () => void;
  onUpdateRadio: (updatedRadio: {
    name: string;
    country: string;
    url: string;
  }) => void;
}

const RadioItem = ({
  name,
  country,
  url,
  onRemoveFavorite,
  onUpdateRadio,
}: RadioItemProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleSave = (updatedRadio: {
    name: string;
    country: string;
    url: string;
  }) => {
    onUpdateRadio(updatedRadio);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <div className="flex justify-between items-center p-4 bg-gray-800 rounded-md">
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-gray-400">{country}</p>
        </div>
        <div className="flex space-x-2">
          <Button
            className="p-2 rounded-full bg-gray-700 text-gray-400"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause /> : <Play />}
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

      <audio ref={audioRef} src={url} preload="none" />

      {isEditModalOpen && (
        <EditRadioModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSave}
          radio={{ name, country, url }}
        />
      )}
    </>
  );
};

export default RadioItem;
