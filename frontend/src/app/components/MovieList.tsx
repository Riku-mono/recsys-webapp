'use client';

import { Movie, User } from '@/types/data';
import MovieCard from './MovieCard';
import { useEffect, useState } from 'react';
import deleteRating from '@/services/ratings/deleteRating';

type Props = {
  phrase: string;
  movies: Movie[];
  perPage: number;
  user: User;
  isMyList?: boolean;
};

export default function MovieList(props: Props) {
  const [movies, setMovies] = useState<Movie[]>(props.movies);
  const [currentMovies, setCurrentMovies] = useState<Movie[]>();
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (movies.length <= 0) {
      setCurrentMovies(movies);
    }

    const start = currentPage * props.perPage;
    const end = start + props.perPage;
    const currentMovies_ = movies.slice(start, end);

    if (currentMovies_.length <= 0) {
      let currentPage_ = currentPage <= 0 ? 0 : currentPage - 1;
      setCurrentPage(currentPage_);
    } else {
      setCurrentMovies(currentMovies_);
    }

    setCurrentMovies(currentMovies_);
  }, [movies, currentPage]);

  const handlePageChange = (page: number) => {
    page = page < 0 ? Math.max(Math.floor((movies.length - 1) / props.perPage), 0) : page;
    page = page >= Math.ceil(movies.length / props.perPage) ? 0 : page;
    setCurrentPage(page);
  };

  const handleDelete = async (movie: Movie) => {
    await deleteRating(props.user, movie);
    const movies_ = movies.filter((movie_) => movie_.id != movie.id);
    setMovies(movies_);
  };

  const handleRatingClick = (movie: Movie) => {
    const movies_ = movies.map((movie_) => {
      let movie__ =
        movie_.id == movie.id
          ? JSON.parse(JSON.stringify(movie))
          : JSON.parse(JSON.stringify(movie_));
      return movie__;
    });
    setMovies(movies_);
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
        {currentMovies?.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            user={props.user}
            isMyList={props.isMyList}
            handleRatingClick={handleRatingClick}
            handleDelete={handleDelete}
          />
        ))}
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
