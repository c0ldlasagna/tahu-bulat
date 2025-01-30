'use client';

import Link from 'next/link';
import { overlock } from '@/app/fonts';
import Tahubulatlogo from '@/components/TahuBulatLogo';

const Footer = () => {
  return (
    <footer id='footer'
      className={`${overlock.className} bg-yellow-400 text-black py-6`}
    >
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Logo */}
        <div className="flex flex-col items-center sm:items-start justify-self-start space-x-4 w-screen">
          <Link href="/">
            <Tahubulatlogo /> {/* Logo component */}
          </Link>
          <p className="text-sm">
            © {new Date().getFullYear()} Tahu Bulat 25. All rights reserved.
          </p>
        </div>

        {/* Address and Contact */}
        <div className="items-center text-center sm:items-end sm:text-right mx-6 text-nowrap">
          <p className="text-sm">Jl. Tahu Bulat No. 25, Jakarta, Indonesia</p>
          <p className="text-sm">Email: info@tahubulat25.id</p>
          <p className="text-sm">Phone: +62 812-3456-XXXX</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
