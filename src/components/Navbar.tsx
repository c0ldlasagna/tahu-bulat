'use client';

import Link from 'next/link';
import { overlock } from '@/app/fonts';
import Tahubulatlogo from '@/components/TahuBulatLogo';
import { useContext, useState } from 'react';
import { signOut } from '@/lib/auth';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { AuthContext } from '@/contexts/auth.context';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: '/about', label: 'About' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/locations', label: 'Locations' },
  ];
  const pathname = usePathname();

  const handleSignout = async () => {
    await signOut();
    window.location.reload();
  };

  return pathname == '/signin' || pathname == '/signup' ? null : (
    <nav
      className={`${overlock.className} flex flex-col flex-grow sticky top-0 z-30 bg-gray-100 text-gray-800 shadow-md h-fit`}
    >
      <div className="container mx-auto flex flex-row justify-between items-center p-4">
        {/* Logo */}
        <div className={`${overlock.className} text-xl font-bold`}>
          <Link href="/">
            <Tahubulatlogo /> {/* Logo component */}
          </Link>
        </div>

        <ul
          className={clsx(
            'hidden sm:flex items-center gap-x-5 justify-items-center text-base md:text-sm lg:text-base',
          )}
        >
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={clsx(
                  'hover:text-yellow-500',
                  pathname === link.href && 'text-yellow-500'
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
          {user ? (
            <>
              <button
                onClick={() => router.push('/profile')}
                className="bg-yellow-400 px-4 py-2 rounded-lg hover:bg-yellow-500 text-center text-sm md:text-base"
              >
                {user.display_name}
              </button>
              <button
                onClick={() => {handleSignout(); router.push('/')}}
                className="bg-red-500 px-4 text-white py-2 rounded-lg hover:bg-red-600 text-center text-sm md:text-base"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/signin"
              className="bg-yellow-400 px-4 py-2 rounded-lg hover:bg-yellow-500 text-sm md:text-base"
            >
              Log In
            </Link>
          )}
        </ul>
        
        {/* Hamburger Menu */}
        <button className='sm:hidden' onClick={() => setMenuOpen(!menuOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
      <div
        className={clsx(
          'sm:hidden flex flex-col items-center gap-y-2 p-4',
          menuOpen ? 'flex' : 'hidden',
        )}
      >
        <ul
  className={clsx(
    'flex flex-col my-auto items-center gap-y-5 justify-items-center text-base md:text-sm lg:text-base',
  )}
>
  {links.map((link) => (
    <li key={link.href}>
      <Link
        href={link.href}
        className={clsx(
          'hover:text-yellow-500',
          pathname === link.href && 'text-yellow-500'
        )}
        onClick={() => setMenuOpen(false)} // Close menu on link click
      >
        {link.label}
      </Link>
    </li>
  ))}
  {user ? (
    <>
      <button
        onClick={() => { setMenuOpen(false); router.push('/profile'); }}
        className="bg-yellow-400 px-4 py-2 rounded-lg hover:bg-yellow-500 text-center text-sm md:text-base"
      >
        {user.display_name}
      </button>
      <button
        onClick={() => {
          handleSignout();
          setMenuOpen(false);
          router.push('/') // Close menu on logout
        }}
        className="bg-red-500 px-4 py-2 mx-2 rounded-lg hover:bg-red-600 text-white text-center text-sm md:text-base"
      >
        Logout
      </button>
    </>
  ) : (
    <Link
      href="/signin"
      className="bg-yellow-400 px-4 py-2 rounded-lg hover:bg-yellow-500 text-sm md:text-base"
      onClick={() => setMenuOpen(false)} // Close menu on login
    >
      Log In
    </Link>
  )}
</ul>

        </div>
    </nav>
  );
};

export default Navbar;
