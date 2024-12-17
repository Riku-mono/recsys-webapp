'use client';

import { Movie } from '@/types/data';
import MovieCard from './MovieCard';
import { useEffect, useState } from 'react';

type Props = {
  phrase: string;
  movies: Movie[];
  perPage: number;
};

export default function MovieList(props: Props) {
  const [movies, setMovies] = useState<Movie[]>(props.movies);
  const [currentMovies, setCurrentMovies] = useState<Movie[]>();

  useEffect(() => {
    const start = 0;
    const end = start + props.perPage;
    const currentMovies_ = movies.slice(start, end);

    setCurrentMovies(currentMovies_);
  }, [movies]);

  return (
    <>
      <div className="text-xl">{props.phrase}</div>
      <div className="mx-4 my-4 flex justify-between">
        {currentMovies?.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </>
  );
}
