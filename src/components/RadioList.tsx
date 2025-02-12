"use client";

import { useState, useEffect } from "react";
import RadioItem from "./RadioItem";

interface RadioData {
  name: string;
  country: string;
  url: string;
  onRemoveFavorite: () => void;
}

interface RadioListProps {
  radios: {
    name: string;
    country: string;
    url_resolved: string;
    onRemoveFavorite: () => void;
  }[];
}

const RadioList = ({ radios }: RadioListProps) => {
  const [radioList, setRadioList] = useState<RadioData[]>(
    radios.map((radio) => ({
      ...radio,
      url: radio.url_resolved,
    }))
  );

  useEffect(() => {
    setRadioList(
      radios.map((radio) => ({
        ...radio,
        url: radio.url_resolved,
      }))
    );
  }, [radios]);

  const handleUpdateRadio = (index: number, updatedRadio: RadioData) => {
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
          url={radio.url} // Agora sempre usamos 'url'
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
