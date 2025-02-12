"use client";

import RadioList from "@/components/RadioList";
import SearchBar from "@/components/SearchBar";
import Menu from "@/components/Menu";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRadios } from "@/hooks/useRadios";

const queryClient = new QueryClient();

interface Radio {
  stationuuid: string;
  name: string;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);

  const { data: radios, isLoading, error } = useRadios();

  if (isLoading)
    return <div className="text-white text-center">Carregando rádios...</div>;

  if (error instanceof Error)
    return <div className="text-white text-center">Erro: {error.message}</div>;

  const categories: string[] = radios.map((radio: Radio) => radio.name.trim());

  const toggleFavorite = (radioName: string) => {
    setFavorites((prev) => {
      if (prev.includes(radioName)) {
        return prev.filter((name) => name !== radioName);
      } else {
        return [...prev, radioName];
      }
    });
  };

  const displayedRadios =
    favorites.length > 0
      ? radios
          .filter(
            (radio: Radio) =>
              favorites.includes(radio.name.trim()) &&
              radio.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((radio: Radio) => ({
            ...radio,
            onRemoveFavorite: () => toggleFavorite(radio.name.trim()),
          }))
      : [];

  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-gray-900 text-white min-h-screen flex">
        <Menu
          categories={categories}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />

        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Radio Browser</h1>

          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <section>
            <h2 className="text-xl mb-4 text-center">Favorite Radios</h2>
            {displayedRadios.length === 0 ? (
              <p className="text-center">Nenhum favorito selecionado.</p>
            ) : (
              <RadioList radios={displayedRadios} />
            )}
          </section>
        </main>
      </div>
    </QueryClientProvider>
  );
}
