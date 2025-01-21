import { ApiContext, Movie, User } from '@/types/data';
import { fetcher } from '@/utils';

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
};

/**
 * 映画取得API
 * @param movieId 映画ID
 * @param user ユーザー
 * @returns 映画
 */
export default async function getMovie(movieId: number, user?: User): Promise<Movie> {
  const userParam = user ? `?user_id=${user.id}` : '';
  return await fetcher(`${context.apiRootUrl?.replace(/\/$/g, '')}/movies/${movieId}/` + userParam, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      cache: 'no-cache',
    },
  });
}
