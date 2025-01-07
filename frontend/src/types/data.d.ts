// 映画
export type Movie = {
  id: number;
  title: string;
  year: number;
  genres: string[];
  imdb_id: number;
  tmdb_id: number;
  rating: Rating;
};

// ユーザ
export type User = {
  id: string;
  email: string;
};

// 評価値
export type Rating = {
  id: string;
  user_id: string;
  movie_id: number;
  rating: number;
  rated_at: string;
};

// API Context
export type ApiContext = {
  apiRootUrl: string | undefined;
};
