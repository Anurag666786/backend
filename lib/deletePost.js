import client from "@/api/client";

export const deletePost = async (postId) => {
  // 1. Fetch the post to check for image_url
  const { data: post, error: fetchError } = await client
    .from("posts")
    .select("image_url")
    .eq("id", postId)
    .single();

  if (fetchError) {
    return { error: fetchError };
  }

  // 2. If it has an image, delete it from storage
  if (post?.image_url) {
    try {
      // Extract file name from public URL
      const url = new URL(post.image_url);
      const pathParts = url.pathname.split("/");
      const fileName = pathParts[pathParts.length - 1];

      const { error: storageError } = await client.storage
        .from("blog-images")
        .remove([fileName]);

      if (storageError) {
        console.error("Error deleting image from storage:", storageError.message);
        // We continue with database record deletion even if storage deletion fails
      }
    } catch (e) {
      console.error("Failed to parse image URL for deletion:", e);
    }
  }

  // 3. Delete the database record
  const { data, error } = await client.from("posts").delete().eq("id", postId);

  return { data, error };
};
