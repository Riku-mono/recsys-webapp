import MovieCardDetail from '@/app/components/MovieCardDetail';
import getMovie from '@/services/movies/getMovie';
import connectUser from '@/services/users/connectUser';

export default async function Movie({ params }: { params: { id: number } }) {
  await connectUser();
  const movieId = Number(params.id);
  const movie = await getMovie(movieId);

  return (
    <>
      <MovieCardDetail movie={movie} />
    </>
  );
}
