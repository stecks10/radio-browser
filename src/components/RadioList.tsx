"use client";

import RadioItem from "./RadioItem";

interface RadioListProps {
  radios: {
    name: string;
    description: string;
    country: string;
    onRemoveFavorite: () => void;
  }[];
}

const RadioList = ({ radios }: RadioListProps) => {
  return (
    <div className="space-y-4">
      {radios.map((radio, index) => (
        <RadioItem
          key={index}
          name={radio.name}
          description={radio.description}
          country={radio.country}
          onRemoveFavorite={radio.onRemoveFavorite}
        />
      ))}
    </div>
  );
};

export default RadioList;
