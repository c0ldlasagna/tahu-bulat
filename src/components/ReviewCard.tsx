import { overlock } from "@/app/fonts";
import Image from "next/image";
import { useState } from "react";

export default function ReviewCard({
  name,
  rating,
  comment,
  profilePicture,
}: {
  name: string;
  rating: number;
  comment: string;
  profilePicture: string;
}) {
  const [reviewCacheBuster] = useState(Date.now());
  return (
    <div className={`${overlock.className} bg-white rounded-lg shadow-md p-6`}>
      <div className="flex items-center mb-4">
        {/* Avatar */}
        <Image
          src={`${profilePicture}?download=true&t=${reviewCacheBuster}`}
          width={100}
          height={100}
          alt={`${name}'s profile`}
          className="w-12 h-12 rounded-full mr-4"
        />
        {/* Name and Rating */}
        <div>
          <h3 className="font-bold text-black text-lg">{name}</h3>
          <p className="text-yellow-500 font-semibold">
            {'⭐'.repeat(rating)} {rating}/5
          </p>
        </div>
      </div>
      <p className="text-black">{comment}</p>
    </div>
  );
}
