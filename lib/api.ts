import { AnimeList } from "@/types/anime.type";

const BASE_URL = "https://api.jikan.moe/v4";

export async function getSeasonNow() {
  const response = await fetch(`${BASE_URL}/seasons/now`);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const responseJson: AnimeList = await response.json();
  return responseJson;
}
