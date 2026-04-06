import client from "@/api/client";

export const deletePost = async (postId) => {
  const { data, error } = await client.from("posts").delete().eq("id", postId);

  return { data, error };
};
