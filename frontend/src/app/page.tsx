import { SessionProvider } from 'next-auth/react';
import HelloAccount from './components/HelloAccount';
import MovieList from './components/MovieList';
import getMovies from '@/services/movies/getMovies';
import connectUser from '@/services/users/connectUser';

const PER_PAGE = 5;

export default async function Index() {
  await connectUser();
  const movies = await getMovies();

  return (
    <>
      <section>
        <SessionProvider>
          <HelloAccount />
        </SessionProvider>
        <MovieList phrase="本日のおすすめ" movies={movies} perPage={PER_PAGE} />
      </section>
    </>
  );
}
