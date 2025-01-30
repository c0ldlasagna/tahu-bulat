/* eslint-disable @next/next/no-img-element */
import { overlock } from "@/app/fonts";

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
  return (
    <div className={`${overlock.className} bg-white rounded-lg shadow-md p-6`}>
      <div className="flex items-center mb-4">
        {/* Avatar */}
        <img
          src={profilePicture}
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
