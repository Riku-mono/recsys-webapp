import { auth } from '@/auth';

export default async function MyAccountPage() {
  const session = await auth();

  if (!session) return <div>Not authenticated</div>;

  return (
    <>
      <h1>Server Side</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </>
  );
}
