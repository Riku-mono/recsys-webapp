// 映画
export type Movie = {
  id: number;
  title: string;
  year: number;
  genres: string[];
  imdb_id: number;
  tmdb_id: number;
};

// API Context
export type ApiContext = {
  apiRootUrl: string | undefined;
};
