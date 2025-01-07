'use client'; // 追加で解決?

import { Movie, User } from '@/types/data';
import Image from 'next/image';
import StarRating from './StarRating';
import postRating from '@/services/ratings/postRating';

const STAR_WIDTH = 48;

type Props = {
  movie: Movie;
  user: User;
};

export default function MovieCardDetail(props: Props) {
  const handleRatingClick = async (rating: number) => {
    /*
     * Error: Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with "use server".
     *        Or maybe you meant to call this function rather than return it.
     *
     * (S): Server Components
     * (C): Client Components
     * 明 : 明示的
     * 暗 : 暗黙的
     *
     * "movies/[id]/page.tsx"(S/明)で、MovieCardDetail(S/暗)を呼び出し、MovieCardDetailで定義した、handleRatingClickを<StarRating />(C/明)渡している。
     * <StarRating/>(C/明) 内の、<Star />(C/暗)でButtonのOnClick時、handleRatingClickを呼び出している。
     *
     * しかし、handleRatingClick 内の postRating関数(S)が(C)に直接渡されているため、エラーが発生している。
     * そのため、明示的に"use server"を追加して、Server Actionsとして処理するように修正するか、<MovieCardDetail />を(S)ではなく(C)に変更する必要がある。
     */
    // 'use server'; // 追加で解決?
    await postRating(props.user, props.movie, rating);
  };

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
        {props.user ? (
          <StarRating
            starWidth={STAR_WIDTH}
            rating={props.movie.rating?.rating}
            handleRatingClick={handleRatingClick}
          />
        ) : (
          <></>
        )}
      </article>
    </>
  );
}
