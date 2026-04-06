import client from "@/api/client";

export const getMyPosts = async (userId) => {
  if (!userId) {
    console.error("User ID is required");
    return [];
  }

  const { data, error } = await client
    .from("posts")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error.message);
    return [];
  }

  return data;
};
