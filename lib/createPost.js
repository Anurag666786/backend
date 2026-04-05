import client from "@/api/client";

export const createPost = async ({ title, content, imageUrl }) => {
  const { data: userData, error: userError } = await client.auth.getUser();

  if (userError || !userData?.user) {
    console.error("User not found", userError);
    return null;
  }

  const { data, error } = await client
    .from("posts")
    .insert([
      {
        title,
        content,
        image_url: imageUrl,
        user_id: userData.user.id,
      },
    ])
    .select();

  return { data, error };
};
