"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import * as Dialog from "@radix-ui/react-dialog";

interface EditRadioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedRadio: { name: string; country: string }) => void;
  radio: { name: string; country: string };
}

const EditRadioModal = ({
  isOpen,
  onClose,
  onSave,
  radio,
}: EditRadioModalProps) => {
  const [name, setName] = useState(radio.name);
  const [country, setCountry] = useState(radio.country);

  const handleSave = () => {
    onSave({ name, country });
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 p-6 rounded-lg shadow-lg w-[400px] max-w-full text-white z-50">
          <Dialog.Title className="text-xl font-semibold text-gray-200">
            Editar Rádio
          </Dialog.Title>

          <div className="space-y-4 mt-4">
            <Input
              className="bg-gray-800 border border-gray-700 text-white rounded-md p-2 w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome da Rádio"
            />
            <Input
              className="bg-gray-800 border border-gray-700 text-white rounded-md p-2 w-full"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="País"
            />
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="bg-gray-700 text-gray-300 hover:bg-gray-600 px-4 py-2 rounded-md"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Salvar
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default EditRadioModal;
