import { getSession } from '@/utilities/functions/auth';
import Link from 'next/link';
import Button from '../Buttons/Button';
import NavLinks from '../Display/NavLinks';

const Header = async () => {
  const session = await getSession();

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4 py-3">
        {/* Logo */}
        <Link
          className="text-xl md:text-2xl font-bold whitespace-nowrap flex flex-col md:flex-row text-gray-900 hover:text-blue-600 transition-colors"
          href="/"
        >
          <span>BDIX</span>
          <span className="text-sm md:text-2xl font-medium text-blue-600 md:ml-2">
            Live Stream
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLinks />
        </div>

        {/* Action Button */}
        <div className="flex items-center space-x-3">
          {session ? (
            <Link href="/share">
              <Button title="Add Stream" />
            </Link>
          ) : (
            <Link href="/authenticate">
              <Button title="Login" />
            </Link>
          )}
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <NavLinks />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
