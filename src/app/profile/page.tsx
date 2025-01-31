/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect, useContext } from "react";
import { supabase } from "@/lib/supabase";
import { overlock } from "../fonts";
import { uploadAvatar } from "@/lib/avatar";
import { fetchReviews } from "@/lib/reviewfuncs";
import ReviewCard from "@/components/ReviewCard";
import { AuthContext } from "@/contexts/auth.context";
import Image from "next/image";

export default function Profile() {
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [cacheBuster, setCacheBuster] = useState(Date.now()); // Cache-busting timestamp for profile
  const [reviewCacheBuster, setReviewCacheBuster] = useState(Date.now()); // Cache-busting for reviews

  interface Review {
    name: string;
    profile_picture: string;
    id: string;
    user_id: string;
    rating: number;
    review: string;
    created_at: string;
  }

  const [reviews, setReviews] = useState<Review[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetchUserProfile(user.sub);
      getUserReviews(user.sub);
    }
  }, [user]);

  async function fetchUserProfile(userId: string) {
    const { data, error } = await supabase
      .from("users")
      .select("profile_picture")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching avatar:", error);
      return;
    }

    if (data?.profile_picture) {
      setImageUrl(`${data.profile_picture}?download=true&t=${cacheBuster}`);
    }
  }

  async function getUserReviews(userId: string) {
    const fetchedReviews = await fetchReviews();
    const updatedReviews = fetchedReviews
      .filter((review) => review.user_id === userId)
      .map((review) => ({
        ...review,
        profile_picture: `${review.profile_picture}?download=true&t=${reviewCacheBuster}`, // Cache-busting
      }));

    setReviews(updatedReviews);
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  async function uploadImage() {
    if (!image || !user?.sub) return;

    setUploading(true);
    try {
      const publicUrl = await uploadAvatar(image);

      const { error: updateError } = await supabase
        .from("users")
        .update({ profile_picture: publicUrl })
        .eq("id", user.sub);

      if (updateError) {
        throw new Error("Error updating profile picture");
      }

      // Update state dynamically
      setImageUrl(`${publicUrl}?download=true&t=${Date.now()}`);
      setCacheBuster(Date.now()); // Force profile picture update

      // Refresh reviews to update profile pictures there too
      setReviewCacheBuster(Date.now());
      getUserReviews(user.sub);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred");
      }
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className={`${overlock.className} p-4 min-w-screen text-black min-h-screen bg-gray-200`}>
      <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">Profile</h2>

      <div className="flex flex-col sm:flex-row text-center sm:text-left items-center bg-yellow-400 rounded-xl p-10">
        <Image
          src={imageUrl || "/avatar_default.webp"}
          alt="Profile Picture"
          width={100}
          height={100} // Prevent aggressive Next.js caching
          className="w-[100px] h-[100px] rounded-full sm:mr-4"
        />
        <div className="flex flex-col justify-items-start">
          <p className="text-3xl font-semibold">{user?.display_name}</p>
        </div>
      </div>

      <div className="my-4 justify-between">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button
          onClick={uploadImage}
          disabled={uploading}
          className="p-2 bg-blue-500 text-white rounded mt-2"
        >
          {uploading ? "Uploading..." : "Upload Profile Picture"}
        </button>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-2">Your Reviews</h3>
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              name={review.name}
              rating={review.rating}
              comment={review.review}
              profilePicture={`${review.profile_picture}?download=true&t=${reviewCacheBuster}`} // Cache-busting for reviews
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">You haven&apos;t written any reviews yet.</p>
      )}
    </div>
  );
}
