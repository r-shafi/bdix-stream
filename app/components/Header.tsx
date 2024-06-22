import Link from 'next/link';

const LINKS = [
  { title: 'Home', href: '/' },
  { title: 'Sports', href: '/' },
  { title: 'Entertainment', href: '/' },
  { title: 'Announcement', href: '/' },
];

const Header = () => {
  return (
    <nav className="bg-white border-gray-200 backdrop-blur-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          className="self-center text-2xl text-gray-600 font-semibold whitespace-nowrap"
          href="/"
        >
          m3u8
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Link href="/editor">Add New Link</Link>
        </div>
        <div className="flex items-center gap-4">
          {LINKS.map((link) => (
            <Link key={link.title} href={link.href}>
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Header;
