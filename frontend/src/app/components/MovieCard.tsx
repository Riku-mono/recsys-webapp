import { Movie } from '@/types/data';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  movie: Movie;
};

export default function MovieCard(props: Props) {
  return (
    <>
      <article className="h-72 w-32 shadow" key={props.movie.id}>
        <Link href={`/movies/${props.movie.id}`} className="hover:opacity-75">
          <Image src="/dummy_poster.png" alt="dummy" width={120} height={180} />
        </Link>
        <div className="mx-1">
          <div className="line-clamp-2 font-semibold text-gray-800">{props.movie.title}</div>
          <div className="flex">
            <div className="my-1 rounded bg-gray-200 px-1 py-0.5 text-sm text-gray-800">
              {props.movie.year}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
