import { SessionProvider } from 'next-auth/react';
import HelloAccount from './components/HelloAccount';
import MovieList from './components/MovieList';

const PER_PAGE = 5;

export default function Index() {
  const movies = [
    {
      id: 1,
      title: 'Toy Story',
      year: 1995,
      genres: ['Adventure', 'Animation', 'Children', 'Comedy', 'Fantasy'],
      imdb_id: 114709,
      tmdb_id: 862,
    },
    {
      id: 2,
      title: 'Jumanji',
      year: 1995,
      genres: ['Adventure', 'Children', 'Fantasy'],
      imdb_id: 113497,
      tmdb_id: 8844,
    },
    {
      id: 3,
      title: 'Grumpier Old Men',
      year: 1995,
      genres: ['Comedy', 'Romance'],
      imdb_id: 113228,
      tmdb_id: 15602,
    },
  ];
  console.log(movies);

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
