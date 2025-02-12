"use client";

import { useState, useEffect } from "react";
import RadioItem from "./RadioItem";

interface RadioListProps {
  radios: {
    name: string;
    country: string;
    onRemoveFavorite: () => void;
  }[];
}

const RadioList = ({ radios }: RadioListProps) => {
  const [radioList, setRadioList] = useState(radios);

  useEffect(() => {
    setRadioList(radios);
  }, [radios]);

  const handleUpdateRadio = (
    index: number,
    updatedRadio: {
      name: string;
      country: string;
      onRemoveFavorite: () => void;
    }
  ) => {
    const newRadios = [...radioList];
    newRadios[index] = {
      ...updatedRadio,
      onRemoveFavorite: radioList[index].onRemoveFavorite,
    };
    setRadioList(newRadios);
  };

  return (
    <div className="space-y-4">
      {radioList.map((radio, index) => (
        <RadioItem
          key={index}
          name={radio.name}
          country={radio.country}
          onRemoveFavorite={radio.onRemoveFavorite}
          onUpdateRadio={(updatedRadio) =>
            handleUpdateRadio(index, {
              ...updatedRadio,
              onRemoveFavorite: radio.onRemoveFavorite,
            })
          }
        />
      ))}
    </div>
  );
};

export default RadioList;
