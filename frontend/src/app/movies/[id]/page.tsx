import MovieCardDetail from '@/app/components/MovieCardDetail';
import getMovie from '@/services/movies/getMovie';

export default async function Movie({ params }: { params: { id: number } }) {
  const movieId = Number(params.id);
  const movie = await getMovie(movieId);

  return (
    <>
      <MovieCardDetail movie={movie} />
    </>
  );
}
