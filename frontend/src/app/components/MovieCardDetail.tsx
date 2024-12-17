import { Movie } from '@/types/data';
import Image from 'next/image';

type Props = {
  movie: Movie;
};

export default function MovieCardDetail(props: Props) {
  return (
    <>
      <article key={props.movie.id}>
        <div className="mx-4 my-4 flex">
          <div className="hidden flex-shrink-0 md:block">
            <Image src="/dummy_poster.png" alt="" width={150} height={224} />
          </div>
          <div className="ml-6">
            <div>
              <h3 className="text-3xl font-semibold text-gray-800">{props.movie.title}</h3>
            </div>
            <div className="my-2 flex">
              <div className="mx-1 my-1 rounded bg-gray-200 px-1 py-0.5 text-sm text-gray-800">
                {props.movie.year}
              </div>
            </div>
            <div className="my-2 flex">
              {props.movie.genres.map((genre) => (
                <div
                  className="mx-1 rounded bg-blue-500 px-1 py-0.5 text-xs text-white"
                  key={genre}
                >
                  {genre}
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
