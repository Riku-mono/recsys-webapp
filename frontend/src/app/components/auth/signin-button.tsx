'use client';

import { signIn } from 'next-auth/react';

type Props = {
  provider: string;
};

export function SignIn(props: Props) {
  return <button onClick={() => signIn(props.provider)}>Sign In</button>;
}
