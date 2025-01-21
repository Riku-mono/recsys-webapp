import { User } from '@/types/data';
import React from 'react';
import MovieList from './MovieList';
import getMoviesBPR from '@/services/movies/getMoviesBPR';

type Props = {
  perPage: number;
  user: User;
};

export default async function MovieListBPR(props: Props) {
  const phrase = 'あなたにおすすめの映画';
  const movies = await getMoviesBPR(props.user);

  return (
    <>
      <MovieList phrase={phrase} movies={movies} perPage={props.perPage} user={props.user} />
    </>
  );
}
