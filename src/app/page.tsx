// page.tsx (Main Page)
import React from 'react';
import {overlock} from '@/app/fonts';
import Link from 'next/link';

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className={`${overlock.className} relative bg-[url('/tahu-bulat-bg.jpg')] w-dvh bg-cover bg-center h-screen flex items-center`}>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-50"></div>
        <div className="relative z-10 container mx-auto px-6 text-left text-white">
          <h1 className="text-5xl font-bold mb-6">Tahu Bulat 25</h1>
          <p className="text-xl mb-6">
            Crunchy on the outside, soft on the inside. 
            <br />Enjoy the best Tahu Bulat in town!
          </p>
          <div className='flex flex-col justify-items-start items-start gap-4 w-40 text-center'>
          <Link href = '/about' className="bg-white grow text-yellow-500 px-6 py-3 w-40 rounded-full font-semibold shadow-lg hover:bg-yellow-500 hover:text-white">
          Learn More
          </Link>
          <Link href={'/locations'} className='bg-white grow text-yellow-500 px-6 py-3 w-40 rounded-full font-semibold shadow-lg hover:bg-yellow-500 hover:text-white'>
          Find Us
          </Link>
          <Link href={'/reviews'} className='bg-white grow text-yellow-500 px-6 py-3 w-40 rounded-full font-semibold shadow-lg hover:bg-yellow-500 hover:text-white'>
          See Reviews
          </Link>
          </div>
          
        </div>
      </section>
    </>
  );
};

export default Home;
