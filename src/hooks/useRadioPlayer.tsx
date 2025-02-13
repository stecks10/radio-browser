"use client";

import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRadioPlayerStore } from "@/hooks/useRadioPlayerStore";

export const useRadioPlayer = (
  url: string,
  isPlaying: boolean,
  onPlayStateChange: (isPlaying: boolean) => void
) => {
  const { toast } = useToast();
  const { activeRadio, setActiveRadio } = useRadioPlayerStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioError, setAudioError] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;

    if (activeRadio !== url && audioRef.current?.paused === false) {
      audioRef.current.pause();
    }
  }, [activeRadio, url]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (url.endsWith(".m3u8")) {
      toast({
        title: "Rádio não suportada",
        description:
          "Esta rádio usa um formato não compatível com o navegador. Tente outra estação.",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setActiveRadio(null);
      onPlayStateChange(false);
    } else {
      if (activeRadio && activeRadio !== url) {
        setActiveRadio(null);
      }

      setActiveRadio(url);
      audioRef.current
        .play()
        .then(() => {
          setAudioError(false);
          onPlayStateChange(true);
        })
        .catch((error) => {
          console.error("Erro ao tentar reproduzir o áudio:", error);
          setAudioError(true);
          setActiveRadio(null);
          toast({
            title: "Erro ao reproduzir",
            description:
              "Não foi possível reproduzir a rádio. Tente novamente.",
            variant: "destructive",
            duration: 4000,
          });
        });
    }
  };

  return { audioRef, audioError, togglePlay };
};
