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

  const { data: radios, isLoading, error } = useRadios();

  if (isLoading)
    return <div className="text-white text-center">Carregando rádios...</div>;

  if (error instanceof Error)
    return <div className="text-white text-center">Erro: {error.message}</div>;

  const categories: string[] = radios.map((radio: Radio) => radio.name.trim());

  const filteredRadios = radios.filter((radio: Radio) =>
    radio.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-gray-900 text-white min-h-screen flex">
        <Menu categories={categories} />

        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Radio Browser</h1>

          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <section>
            <h2 className="text-xl mb-4 text-center">Favorite Radios</h2>
            <RadioList radios={filteredRadios} />
          </section>
        </main>
      </div>
    </QueryClientProvider>
  );
}
