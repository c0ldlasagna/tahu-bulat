'use client';
import { overlock } from "../fonts";

export default function About() {
  return (
    <>
      <div className="bg-gray-200 flex items-middle flex-row-reverse min-h-screen">
        {/* Image Section */}
        <div className="min-h-screen lg:w-1/2 bg-[url('/tofu-top-view.webp')] bg-cover bg-center bg-no-repeat">
        </div>

        {/* Text Section */}
        <div
          className={`${overlock.className} min-h-screen flex flex-col justify-center px-7 lg:basis-1/2 h-1/2 lg:h-full `}
        >
          <h1 className={`${overlock.className} text-3xl text-black font-bold text-center my-6`}>
            About Us
          </h1>
          <p className="text-black text-m flex mb-10 ">
            Tahu Bulat 25 began as a humble street-side food stall in 1925,
            founded by a visionary named Duapul O. Lima. Lima, a young man from a
            small village, had a passion for crafting the perfect tahu bulat,
            a dish that had captivated his imagination since
            childhood. He spent years perfecting the recipe, combining traditional
            spices and ingredients with his own unique touch.
            <br />
            <br />
            The name &quot;Tahu Bulat 25&quot; honors both the dish itself and the year it
            was established. Lima’s stall, set in a vibrant town square, quickly
            gained a loyal following. Locals would gather in the evenings,
            enjoying the crispy, golden tofu paired with sweet and savory dipping
            sauces. Eko’s dedication to quality and consistency helped the stall
            grow into a beloved local brand.
            <br />
            <br />
            By the mid-1930s, Tahu Bulat 25 expanded into a small shop, with a
            loyal customer base and a reputation for quality. Despite the
            changing times and challenges, the store’s original recipe and
            commitment to customer satisfaction have remained unchanged,
            continuing to serve the community with warmth and care for nearly a
            century.
          </p>
        </div>
      </div>
    </>
  );
}
