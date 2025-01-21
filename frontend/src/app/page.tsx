import { SessionProvider } from 'next-auth/react';
import HelloAccount from './components/HelloAccount';
import MovieList from './components/MovieList';
import getMovies from '@/services/movies/getMovies';
import connectUser from '@/services/users/connectUser';
import { auth } from '@/auth';
import getUser from '@/services/users/getUser';

const PER_PAGE = 5;

export default async function Index() {
  await connectUser();
  const session = await auth();
  const user = session ? await getUser(session?.user?.email!) : null;
  const movies = await getMovies(user!);

  return (
    <>
      <section>
        <SessionProvider>
          <HelloAccount />
        </SessionProvider>
        <MovieList phrase="本日のおすすめ" movies={movies} perPage={PER_PAGE} user={user!} />
      </section>
    </>
  );
}
