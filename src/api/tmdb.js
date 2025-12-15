const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const tmdbFetch = async (endpoint) => {
  const res = await fetch(`${TMDB_BASE_URL}${endpoint}`, {
    headers: {
      Authorization: TMDB_TOKEN,
      accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch TMDB");
  }

  return res.json();
};
