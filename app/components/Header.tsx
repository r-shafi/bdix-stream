import Link from 'next/link';
import Button from './Buttons/Button';

const LINKS = [
  { title: 'Home', href: '/' },
  { title: 'Sports', href: '/sports' },
  { title: 'Entertainment', href: '/entertainment' },
  { title: 'Announcement', href: '/announcement' },
];

const Header = () => {
  return (
    <nav className="bg-white border-gray-200 backdrop-blur-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          className="self-center text-2xl text-gray-600 font-semibold whitespace-nowrap"
          href="/"
        >
          m3u8
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Link href="/new">
            <Button title="Add New Link"></Button>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-4">
          {LINKS.map((link) => (
            // <AnchorLink title={link.title} href={link.href} key={link.href} />
            <Link
              href={link.href}
              key={link.href}
              className="lowercase text-gray-600 hover:text-gray-800 hover:underline"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Header;
