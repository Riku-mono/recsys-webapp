import Link from 'next/link';
import AccountMenu from './ui/AccountMenu';
import { SignIn } from './auth/signin-button';
import { auth } from '@/auth';

export default async function Header() {
  const session = await auth();
  return (
    <header className="flex items-center justify-between bg-blue-600 px-8 py-4 text-white">
      <div>
        <h1 className="text-2xl font-extrabold">
          <Link href="/">recsys_webapp</Link>
        </h1>
      </div>
      <div>
        <nav className="flex items-center justify-between text-sm font-medium">
          {!session?.user ? <SignIn provider="" /> : <AccountMenu />}
        </nav>
      </div>
    </header>
  );
}
