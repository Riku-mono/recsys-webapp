'use server';

import MovieCardDetail from '@/app/components/MovieCardDetail';
import { auth } from '@/auth';
import getMovie from '@/services/movies/getMovie';
import connectUser from '@/services/users/connectUser';
import getUser from '@/services/users/getUser';

export default async function Movie({ params }: { params: { id: number } }) {
  await connectUser();
  const session = await auth();
  const user = session ? await getUser(session.user?.email!) : null;
  const movieId = Number(params.id);
  const movie = await getMovie(movieId, user!);

  return (
    <>
      <MovieCardDetail movie={movie} user={user!} />
    </>
  );
}
