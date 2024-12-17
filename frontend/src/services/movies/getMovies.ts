import { ApiContext, Movie } from '@/types/data';
import { fetcher } from '@/utils';

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
};

/**
 * 映画リスト取得API
 * @returns 映画リスト
 */
export default async function getMovies(): Promise<Movie[]> {
  return await fetcher(`${context.apiRootUrl?.replace(/\/$/g, '')}/movies/`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      cache: 'no-cache',
    },
  });
}
