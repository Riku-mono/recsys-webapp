import { Movie, User } from '@/types/data';
import Image from 'next/image';
import Link from 'next/link';
import StarRating from './StarRating';
import postRating from '@/services/ratings/postRating';
import getRating from '@/services/ratings/getRating';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { IconButton } from '@mui/material';

const STAR_WIDTH = 24;

type Props = {
  movie: Movie;
  user: User;
  isMyList?: boolean;
  handleRatingClick: Function;
  handleDelete?: Function;
};

export default function MovieCard(props: Props) {
  const handleRatingClick = async (rating: number) => {
    await postRating(props.user, props.movie, rating);
    const rating_ = await getRating(props.user, props.movie);
    let movie_ = JSON.parse(JSON.stringify(props.movie));
    movie_.rating = JSON.parse(JSON.stringify(rating_));
    props.handleRatingClick(movie_);
  };

  return (
    <>
      <article className="h-72 w-32 shadow" key={props.movie.id}>
        <Link href={`/movies/${props.movie.id}`} className="hover:opacity-75">
          {props.movie.omdbMovie ? (
            <Image src={props.movie.omdbMovie.poster} alt="" width={120} height={180} />
          ) : (
            <Image src="/dummy_poster.png" alt="" width={120} height={180} />
          )}
        </Link>
        {props.user ? (
          <StarRating
            starWidth={STAR_WIDTH}
            //            user={props.user}
            //            movie={props.movie}
            rating={props.movie.rating?.rating}
            handleRatingClick={handleRatingClick}
          />
        ) : (
          <></>
        )}
        <div className="mx-1">
          <div className="line-clamp-2 font-semibold text-gray-800">{props.movie.title}</div>
          <div className="flex">
            <div className="my-1 rounded bg-gray-200 px-1 py-0.5 text-sm text-gray-800">
              {props.movie.year}
            </div>
            {props.isMyList == true ? (
              <IconButton onClick={() => props.handleDelete!(props.movie)}>
                <HighlightOffIcon className="text-sm" />
              </IconButton>
            ) : (
              <></>
            )}{' '}
          </div>
        </div>
      </article>
    </>
  );
}
