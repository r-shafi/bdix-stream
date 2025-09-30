'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

const LINKS = [
  { title: 'Home', href: '/' },
  { title: 'Sports', href: '/sports' },
  { title: 'Entertainment', href: '/entertainment' },
  { title: 'Announcement', href: '/announcement' },
];

const NavLinks = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menu when pathname changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        {LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.href}
            className={`
              text-sm font-medium transition-all duration-200 relative group
              ${pathname === link.href 
                ? 'text-blue-600 font-semibold' 
                : 'text-gray-700 hover:text-blue-600'
              }
            `}
          >
            {link.title}
            {/* Active indicator */}
            <span 
              className={`
                absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 transition-all duration-200
                ${pathname === link.href ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}
              `}
            />
          </Link>
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden" ref={menuRef}>
        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-25 md:hidden">
            <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-xl">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="p-4">
                <div className="space-y-1">
                  {LINKS.map((link) => (
                    <Link
                      href={link.href}
                      key={link.href}
                      className={`
                        flex items-center px-4 py-3 text-base font-medium rounded-lg transition-all duration-200
                        ${pathname === link.href
                          ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-600'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }
                      `}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.title}
                      {pathname === link.href && (
                        <span className="ml-auto text-blue-600">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      )}
                    </Link>
                  ))}
                </div>

                {/* Mobile Menu Footer */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="text-xs text-gray-500 text-center">
                    BDIX Live Stream
                  </div>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NavLinks;
