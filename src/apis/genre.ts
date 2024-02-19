import { genre } from "@/types";

export const getGenres = async () => {
  const data = await fetch("/api/genres");
  const genres = await data.json();
  return genres as genre[];
};
