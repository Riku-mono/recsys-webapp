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
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const start = currentPage * props.perPage;
    const end = start + props.perPage;
    const currentMovies_ = movies.slice(start, end);

    setCurrentMovies(currentMovies_);
  }, [movies, currentPage]);

  const handlePageChange = (page: number) => {
    page = page < 0 ? Math.max(Math.floor((movies.length - 1) / props.perPage), 0) : page;
    page = page >= Math.ceil(movies.length / props.perPage) ? 0 : page;
    setCurrentPage(page);
  };

  return (
    <>
      <div className="text-xl">{props.phrase}</div>
      <div className="mx-4 my-4 flex justify-between">
        <button
          className="rounded-md border-2 border-gray-200 text-gray-800 hover:bg-gray-100 active:border-gray-300 active:bg-gray-200"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          ＜
        </button>
        {currentMovies?.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        <button
          className="rounded-md border-2 border-gray-200 text-gray-800 hover:bg-gray-100 active:border-gray-300 active:bg-gray-200"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          ＞
        </button>
      </div>
    </>
  );
}
