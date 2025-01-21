import { auth } from '@/auth';
import getMoviesRated from '@/services/movies/getMoviesRated';
import connectUser from '@/services/users/connectUser';
import getUser from '@/services/users/getUser';
import React from 'react';
import MovieList from '../components/MovieList';
import MovieListBPR from '../components/MovieListBPR';

const PER_PAGE = 5;

export default async function MyPage() {
  await connectUser();
  const session = await auth();
  const user = session ? await getUser(session?.user?.email!) : null;
  const movies = await getMoviesRated(user!);
  const phrase = 'マイリスト';

  return (
    <>
      {session?.user ? (
        <>
          <MovieList phrase={phrase} movies={movies} perPage={PER_PAGE} user={user!} />
          {/* @ts-expect-error Server Component */}
          <MovieListBPR user={user!} perPage={PER_PAGE} />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
