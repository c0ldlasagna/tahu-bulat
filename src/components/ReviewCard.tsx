import { overlock } from "@/app/fonts";

export default function ReviewCard({ name, rating, comment }: { name: string; rating: number; comment: string }) {
    return (
      <div className={`${overlock.className} bg-white rounded-lg shadow-md p-6`}>
        <div className="mb-4">
          <h3 className="font-bold text-black text-lg">{name}</h3>
          <p className="text-yellow-500 font-semibold">
            {'⭐'.repeat(rating)} {rating}/5
          </p>
        </div>
        <p className="text-black">{comment}</p>
      </div>
    );
  }