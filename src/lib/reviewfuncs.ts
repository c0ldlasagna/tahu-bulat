import { supabase } from './supabase';
import axios from 'axios';

const reviewsData: { [key: string]: string[] } = {
  "1": [
    "Terrible experience, would not recommend.",
    "Food was cold and tasteless.",
    "Service was slow and rude.",
    "Not worth the money.",
    "Disappointing, expected better.",
    "Found a hair in my food, disgusting!",
    "Overpriced and underwhelming.",
    "Portions were way too small.",
    "Worst customer service I've ever had.",
    "Would never go back."
  ],
  "2": [
    "Mediocre at best.",
    "Not the worst, but far from great.",
    "Somewhat edible, but wouldn’t order again.",
    "The place was dirty and unorganized.",
    "Service was okay but food lacked flavor.",
    "Food was below average, wouldn’t recommend.",
    "Slightly better than fast food, but not by much.",
    "Had higher expectations, but was let down.",
    "Not the best experience, but not the worst.",
    "Could improve in many areas."
  ],
  "3": [
    "Decent, but nothing special.",
    "An average meal, nothing to write home about.",
    "Good for a quick bite, but not a go-to place.",
    "Food was okay, but service could be better.",
    "Mediocre experience, but not terrible.",
    "Some dishes were good, others were just okay.",
    "Would go again if no better options were available.",
    "Service was friendly, but the food was just fine.",
    "A hit or miss kind of place.",
    "Nothing stood out, but also not a disaster."
  ],
  "4": [
    "Pretty good overall, would recommend.",
    "Tasty food and decent service.",
    "A pleasant experience, I’d come back.",
    "Service was great, and the food was good too.",
    "Nice portions and good flavors.",
    "Enjoyed my meal, everything was well-cooked.",
    "A solid choice for a casual meal.",
    "Comfortable atmosphere and good food.",
    "Would recommend to friends.",
    "Good value for the price."
  ],
  "5": [
    "Absolutely amazing, best meal ever!",
    "Delicious food, excellent service!",
    "Perfect in every way, highly recommend!",
    "Best restaurant experience I’ve had.",
    "Incredible flavors and fantastic staff.",
    "Loved every bite, will definitely return!",
    "Exceptional food and atmosphere.",
    "A must-visit place, 10/10!",
    "Beyond my expectations, truly outstanding.",
    "Flawless experience, can’t wait to come back!"
  ]
};

// Fetch reviews along with user data (name and profile picture)
export async function fetchReviews() {
  const { data, error } = await supabase
    .from('Reviews')
    .select('id, user_id, rating, review, created_at')
    .order('created_at', { ascending: false });

  if (error) throw error;
  
  // Fetch user data for each review (e.g., name and profile_picture)
  const reviewsWithUserInfo = await Promise.all(data.map(async (review) => {
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('display_name, profile_picture')
      .eq('id', review.user_id)
      .single();

    if (userError) {
      console.error('Error fetching user data:', userError);
      return { ...review, name: 'Unknown', profile_picture: '/default-avatar.png' };
    }

    return {
      ...review,
      name: userData.display_name || 'Unknown',
      profile_picture: userData.profile_picture || '/default-avatar.png',
    };
  }));
  const fakeReviews = await axios.get('https://randomuser.me/api/?results=10');
  const fakeReviewsData = fakeReviews.data.results.map((review: any) => {
    const rating = Math.floor(Math.random() * 5) + 1;
    return {
      id:Math.floor(Math.random() * (999999 - 10000 + 1)) + 10000,
      name: review.name.first + ' ' + review.name.last,
      profile_picture: review.picture.thumbnail,
      rating: rating,
      review: reviewsData[rating.toString()][Math.floor(Math.random() * 10)],
      created_at: new Date().toISOString()
    };
  });
  return reviewsWithUserInfo.concat(fakeReviewsData);
}



// Add a review - no need to insert the name, just user_id, rating, and review text
export async function addReview(userId: string, review: string, rating: number) {
  const { data, error } = await supabase
    .from('Reviews')
    .insert([{ user_id: userId, rating, review }])
    .select();

  if (error) throw error;

  return data;
}
