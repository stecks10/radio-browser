"use client";

import { useState, useRef, useEffect } from "react";
import { Pen, Play, Trash, Pause, Heart } from "lucide-react";
import { Button } from "./ui/button";
import EditRadioModal from "./EditRadioModal";
import { useToast } from "@/hooks/use-toast";

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
  isPlaying: boolean;
  onPlay: () => void;
  isActive: boolean;
}

const RadioItem = ({
  name,
  country,
  url,
  onRemoveFavorite,
  onUpdateRadio,
  isPlaying,
  onPlay,
  isActive,
}: RadioItemProps) => {
  const { toast } = useToast();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(url);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!isActive && audioRef.current?.paused === false) {
      audioRef.current.pause();
    }
  }, [isActive]);

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

  const validateAudioURL = async (url: string) => {
    try {
      const response = await fetch(url, { method: "HEAD" });
      return response.ok;
    } catch {
      return false;
    }
  };

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (url.endsWith(".m3u8")) {
      toast({
        title: "⚠️ Rádio não suportada",
        description:
          "Esta rádio usa um formato não compatível com o navegador. Tente uma estação diferente.",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      const isValid = await validateAudioURL(url);
      if (!isValid) {
        toast({
          title: "⚠️ Erro ao carregar rádio",
          description:
            "Não foi possível acessar a rádio. Verifique sua conexão ou tente outra estação.",
          variant: "destructive",
          duration: 5000,
        });
        setAudioError(true);
        setAudioSrc(null);
        return;
      }

      setAudioSrc(url);
      audioRef.current
        .play()
        .then(() => {
          setAudioError(false);
        })
        .catch((error) => {
          console.error("Erro ao tentar reproduzir o áudio:", error);
          setAudioError(true);
          setAudioSrc(null);

          toast({
            title: "❌ Erro ao reproduzir",
            description:
              "Não foi possível reproduzir a rádio. Tente novamente.",
            variant: "destructive",
            duration: 4000,
            action: (
              <Button
                className="text-zinc-700"
                variant="outline"
                onClick={togglePlay}
              >
                Tentar novamente
              </Button>
            ),
          });
        });
    }
    onPlay();
  };

  return (
    <>
      <div className="flex justify-between items-center p-4 bg-gray-800 rounded-md">
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-gray-400">{country}</p>
          {audioError && (
            <p className="text-red-500">⚠️ Erro ao carregar a rádio.</p>
          )}
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

      {audioSrc && (
        <audio
          ref={audioRef}
          src={audioSrc}
          preload="none"
          onError={() => {
            console.error("Erro ao carregar a rádio:", url);
            setAudioError(true);
            setAudioSrc(null);
            toast({
              title: "❌ Erro ao carregar",
              description: "Erro ao carregar a rádio. Tente outra estação.",
              variant: "destructive",
              duration: 4000,
            });
          }}
        />
      )}

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
