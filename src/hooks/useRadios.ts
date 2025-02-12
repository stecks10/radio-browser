import { useQuery } from "@tanstack/react-query";

const fetchRadios = async () => {
  const response = await fetch(
    "https://de1.api.radio-browser.info/json/stations/search?limit=10"
  );
  if (!response.ok) {
    throw new Error("Error fetching radio stations");
  }
  return response.json();
};

export const useRadios = () => {
  return useQuery({ queryKey: ["radios"], queryFn: fetchRadios });
};
