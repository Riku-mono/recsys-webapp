import { User } from '@/types/data';
import React from 'react';
import MovieList from './MovieList';
import getMoviesPopularity from '@/services/movies/getMoviesPopularity';

type Props = {
  targetGenreId: number;
  perPage: number;
  user: User;
};

const GENRES = [
  'Action',
  'Adventure',
  'Animation',
  'Children',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Fantasy',
  'Film-Noir',
  'Horror',
  'Musical',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Thriller',
  'War',
  'Western',
  'IMAX',
];

export default async function MovieListPopularity(props: Props) {
  const phrase = GENRES[props.targetGenreId - 1] + 'で人気の映画';
  const movies = await getMoviesPopularity(props.targetGenreId, props.user);

  return (
    <>
      <MovieList phrase={phrase} movies={movies} perPage={props.perPage} user={props.user} />
    </>
  );
}
