import { supabase } from "./supabase";

export async function fetchReviews() {
  const { data, error } = await supabase
    .from('Reviews')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  console.log(data);
  return data;
}
export async function addReview(userId: string, review: string, rating: number, name: string) {
    const { data, error } = await supabase
      .from('Reviews')  
      .insert([{ user_id: userId, name, review, rating }]);
  
    if (error) throw error;
  
    return data;
  }
  