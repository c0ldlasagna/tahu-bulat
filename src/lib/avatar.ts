import { supabase } from "@/lib/supabase";

export async function uploadAvatar(file: File) {
  if (!file) throw new Error("No file selected");

  // ✅ Get authenticated user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("User not authenticated");

  const userId = user.id;
  const fileExt = file.name.split(".").pop();
  const filePath = `${userId}/avatar.${fileExt}`;

  // ✅ Upload with authentication
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, {
      upsert: true, // Allow overwriting existing file
    });

  if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

  // ✅ Fetch the public URL after upload
  const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
  const avatarUrl = data.publicUrl;

  // ✅ Insert the avatar URL into the user's profile_picture column
  const { error: updateError } = await supabase
    .from("users") // Assuming the table is public.users
    .update({ profile_picture: avatarUrl }) // Update the user's profile_picture column
    .eq("id", userId); // Ensure we're updating the correct user

  if (updateError) throw new Error(`Failed to update user profile: ${updateError.message}`);

  return avatarUrl; // Return the avatar URL in case you want to use it elsewhere
}
