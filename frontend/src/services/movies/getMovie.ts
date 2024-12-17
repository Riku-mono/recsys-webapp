import { ApiContext, Movie } from '@/types/data';
import { fetcher } from '@/utils';

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
};

/**
 * 映画取得API
 * @param movieId 映画ID
 * @returns 映画
 */
export default async function getMovie(movieId: number): Promise<Movie> {
  return await fetcher(`${context.apiRootUrl?.replace(/\/$/g, '')}/movies/${movieId}/`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      cache: 'no-cache',
    },
  });
}
