import { SessionProvider } from 'next-auth/react';
import HelloAccount from './components/HelloAccount';

export default function Index() {
  return (
    <>
      <section>
        <SessionProvider>
          <HelloAccount />
        </SessionProvider>
      </section>
    </>
  );
}
