'use client';

import Link from 'next/link';
import { useRouter } from 'next/router';

function AnchorLink(link: { title: string; href: string }) {
  const router = useRouter();

  return (
    <Link
      key={link.title}
      href={link.href}
      className={
        router.pathname === link.href ? 'text-red-500' : 'text-blue-500'
      }
    >
      {link.title}
    </Link>
  );
}

export default AnchorLink;
