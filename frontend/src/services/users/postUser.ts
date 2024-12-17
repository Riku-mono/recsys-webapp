import { v4 as uuidv4 } from 'uuid';
import { ApiContext } from '@/types/data';
import { fetcher } from '@/utils';

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
};

/**
 * ユーザ登録API
 * @param email emailアドレス
 */
export default async function postUser(email: string) {
  const body = {
    id: uuidv4(),
    email: email,
  };
  await fetcher(`${context.apiRootUrl?.replace(/\/$/g, '')}/users/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}
