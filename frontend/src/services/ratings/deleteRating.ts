import { ApiContext, Movie, User } from '@/types/data';
import { fetcher } from '@/utils';

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
};

/**
 * 評価値削除API
 * @param user ユーザ
 * @param movie 映画
 */
export default async function deleteRating(user: User, movie: Movie) {
  const id = user.id + '_' + String(movie.id).padStart(6, '0');
  const body = {
    id: id,
  };
  await fetcher(`${context.apiRootUrl?.replace(/\/$/g, '')}/ratings/`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};
