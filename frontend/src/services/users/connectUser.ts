'use server';
import { auth } from '@/auth';
import getUser from './getUser';
import postUser from './postUser';

/**
 * サインインユーザとデータベース上のユーザとを紐付ける。
 */
export default async function connectUser() {
  const session = await auth();

  if (session) {
    // サインインユーザのemailアドレスがデータベース上に登録されていれば、そのユーザの情報を取得する。
    const user = await getUser(session.user?.email!);

    // データベース上に登録されていなければ、そのユーザを新規登録する。
    if (!user) {
      await postUser(session.user?.email!);
    }
  }
}
