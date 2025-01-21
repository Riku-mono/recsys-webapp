'use server';

import MovieCardDetail from '@/app/components/MovieCardDetail';
import MovieListMoviesMovies from '@/app/components/MovieListMoviesMovies';
import { auth } from '@/auth';
import getMovie from '@/services/movies/getMovie';
import getOMDbMovie from '@/services/omdbApi/getOMDbMovie';
import connectUser from '@/services/users/connectUser';
import getUser from '@/services/users/getUser';

const PER_PAGE = 5;

export default async function Movie({ params }: { params: { id: number } }) {
  await connectUser();
  const session = await auth();
  const user = session ? await getUser(session.user?.email!) : null;
  const movieId = Number(params.id);
  const movie = await getMovie(movieId, user!);
  movie.omdbMovie = await getOMDbMovie(movie);

  return (
    <>
      <MovieCardDetail movie={movie} user={user!} />
      {/* @ts-expect-error Server Component */}
      <MovieListMoviesMovies baseMovie={movie} perPage={PER_PAGE} user={user!} />
    </>
  );
}
