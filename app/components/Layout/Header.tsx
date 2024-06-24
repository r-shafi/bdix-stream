import Link from 'next/link';
import Button from '../Buttons/Button';

const LINKS = [
  { title: 'Home', href: '/' },
  { title: 'Sports', href: '/sports' },
  { title: 'Entertainment', href: '/entertainment' },
  { title: 'Announcement', href: '/announcement' },
];

const Header = () => {
  return (
    <nav className="bg-white border-gray-200 backdrop-blur-md border-b">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link className="text-2xl font-semibold whitespace-nowrap" href="/">
          M3U8
        </Link>
        <div className="flex items-center gap-4">
          {LINKS.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className="text-sm uppercase font-medium text-gray-600 hover:text-gray-800 hover:underline hidden md:block"
            >
              {link.title}
            </Link>
          ))}
          <Link href="/share">
            <Button title="Add New Link"></Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
