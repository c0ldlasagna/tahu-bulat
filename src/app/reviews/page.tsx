'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import ReviewCard from '@/components/ReviewCard';
import { fetchReviews } from '@/lib/reviewfuncs';
import { overlock } from '../fonts';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/contexts/auth.context';
import { useContext } from 'react';

const Reviews = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user } = useContext(AuthContext);
  interface Review {
    id: string;
    user_id: string;
    name: string;
    profile_picture: string;
    rating: number;
    review: string;
  }

  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Fetch reviews from Supabase on page load
  useEffect(() => {
    const getReviews = async () => {
      const fetchedReviews = await fetchReviews();
      setReviews(fetchedReviews);
    };
    getReviews();
  }, []);

  // Check user login state
  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);

  // Handle form submission to add a new review
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.sub) {
      alert('User information is missing. Please log in again.');
      return;
    }
  
    if (!review.trim()) {
      alert('Review cannot be empty.');
      return;
    }
  
    try {
      const { data, error } = await supabase
      .from('Reviews')
      .insert([{user_id: user.sub,rating,review,},])
      .select();
  
      if (error) {
        console.error('Error adding review:', error);
        alert('Failed to add review.');
      } else if (data) {
        const newReview = data[0];
  
        // Update state
        setReviews((prevReviews) => [newReview, ...prevReviews]);
        
        setReview(''); // Clear the form
        setRating(1);
        setIsFormOpen(false);
        window.location.reload();
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('An unexpected error occurred.');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className={`${overlock.className} text-3xl text-black font-bold text-center mb-6`}>Customer Reviews</h2>

      {/* Review Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard
              key={review.id}
              name={review.name}
              rating={review.rating}
              comment={review.review}
              profilePicture={review.profile_picture} // Added profile picture
            />
          ))
        ) : (
          <p className={`${overlock.className} text-black text-bold`}>No reviews yet. Be the first to review!</p>
        )}
      </div>

      {/* Floating Review Button */}
        <button
          onClick={() => { if (isLoggedIn) { setIsFormOpen(true); } else { router.push('/signin'); } }}
          className={`${overlock.className} fixed bottom-6 left-1/2 -translate-x-1/2 bg-yellow-500 text-white p-4 rounded-full shadow-lg hover:bg-yellow-600 transition duration-300`}
        >
          {isLoggedIn ? 'Write a Review' : 'Log in to Write a Review'}
        </button>

      {/* Popup Review Form */}
      {isFormOpen && isLoggedIn && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`${overlock.className} text-black bg-white p-6 rounded-lg shadow-lg w-100 max-w-full`}> 
            <h3 className="text-2xl font-semibold mb-4">Write Your Review</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-lg font-semibold">Rating</label>
                <div className="flex flex-wrap justify-start items-center gap-2 sm:gap-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`p-2 w-14 flex items-center justify-center gap-1 border rounded-md text-lg font-semibold transition duration-300 ${rating === star ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
                    >
                      {star} <span className="text-yellow-500">⭐</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="review" className="block text-lg font-semibold">Your Review</label>
                <textarea
                  id="review"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="Write your review here"
                  rows={4}
                  required
                />
              </div>

              <div className="flex justify-between">
                <button type="submit" className="bg-yellow-500 text-white p-3 rounded-md hover:bg-yellow-600 transition duration-300">Submit</button>
                <button type="button" onClick={() => setIsFormOpen(false)} className="bg-gray-400 text-white p-3 rounded-md hover:bg-gray-500 transition duration-300">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
