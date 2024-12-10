import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-blue-600 px-8 py-4 text-white">
      <div>
        <h1 className="text-2xl font-extrabold">
          <Link href="/">recsys_webapp</Link>
        </h1>
      </div>
      <div>
        <nav className="flex items-center justify-between text-sm font-medium">Sign In</nav>
      </div>
    </header>
  );
}
