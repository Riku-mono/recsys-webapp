'use client';

import { useSession } from 'next-auth/react';

export default function HelloAccount() {
  const { data: session, status } = useSession();

  return (
    <>
      {status === 'loading' ? (
        <div>Loading...</div>
      ) : !session?.user ? (
        <div>ようこそ ゲスト さん！</div>
      ) : (
        <div>ようこそ {session.user.name} さん！</div>
      )}
    </>
  );
}
