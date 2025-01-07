import { ApiContext, Movie, Rating, User } from '@/types/data';
import { fetcher } from '@/utils';

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
};

/**
 * 評価値取得API
 * @param user ユーザ
 * @param movie 映画
 * @returns 評価値
 */
export default async function getRating(user: User, movie: Movie): Promise<Rating> {
  const id = user.id + '_' + String(movie.id).padStart(6, '0');
  const res = await fetcher(`${context.apiRootUrl?.replace(/\/$/g, '')}/ratings/?id=${id}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // cache: 'no-store',  // <- これを有効にするとCORS policyエラーが発生するので注意
    },
  });
  return res.at(-1);
}
