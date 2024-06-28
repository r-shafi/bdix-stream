import Link from 'next/link';
import Button from '../Buttons/Button';
import NavLinks from '../Display/NavLinks';

const Header = () => {
  return (
    <nav className="bg-white border-gray-200 backdrop-blur-md border-b">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link className="text-2xl font-semibold whitespace-nowrap" href="/">
          M3U8
        </Link>
        <div className="flex items-center gap-4">
          <NavLinks />
          <Link href="/share">
            <Button title="Add New Link"></Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
