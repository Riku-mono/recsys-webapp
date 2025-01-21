import { SessionProvider } from 'next-auth/react';
import HelloAccount from './components/HelloAccount';
import MovieList from './components/MovieList';
import getMovies from '@/services/movies/getMovies';
import connectUser from '@/services/users/connectUser';
import { auth } from '@/auth';
import getUser from '@/services/users/getUser';
import MovieListPopularity from './components/MovieListPopularity';

const PER_PAGE = 5;
const N_GENRES = 19;
const N_MOVIE_LISTS_POPULARITY = 3;

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
        {(() => {
          const genres = [...Array(N_GENRES)].map((_, i) => i + 1);
          genres.sort((a, b) => 0.5 - Math.random());

          const movieListsByPopularityRecommender = [];
          for (let i = 0; i < N_MOVIE_LISTS_POPULARITY; i++) {
            movieListsByPopularityRecommender.push(
              // {/* @ts-expect-error Server Component */}
              <MovieListPopularity
                key={i}
                targetGenreId={genres[i]}
                perPage={PER_PAGE}
                user={user!}
              />
            );
          }
          return movieListsByPopularityRecommender;
        })()}
      </section>
    </>
  );
}
