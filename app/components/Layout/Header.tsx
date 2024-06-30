import { getSession } from '@/utilities/functions/auth';
import Link from 'next/link';
import Button from '../Buttons/Button';
import NavLinks from '../Display/NavLinks';

const Header = async () => {
  const session = await getSession();

  return (
    <nav className="bg-white border-gray-200 backdrop-blur-md border-b">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          className="text-xl md:text-2xl font-semibold whitespace-nowrap flex flex-col md:flex-row"
          href="/"
        >
          BDIX <span className="text-sm md:text-2xl">Live Stream</span>
        </Link>
        <div className="flex items-center gap-4">
          <NavLinks />
          {session ? (
            <Link href="/share">
              <Button title="Add Stream"></Button>
            </Link>
          ) : (
            <Link href="/authenticate">
              <Button title="Login"></Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
