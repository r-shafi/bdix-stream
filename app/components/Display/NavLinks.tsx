'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { title: 'Home', href: '/' },
  { title: 'Sports', href: '/sports' },
  { title: 'Entertainment', href: '/entertainment' },
  { title: 'Announcement', href: '/announcement' },
];

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {LINKS.map((link) => (
        <Link
          href={link.href}
          key={link.href}
          className={
            'text-sm uppercase font-medium text-gray-600 hover:text-gray-800 hover:underline hidden md:block ' +
            (pathname === link.href ? 'font-bold text-red-500' : '')
          }
        >
          {link.title}
        </Link>
      ))}
    </>
  );
};

export default NavLinks;
