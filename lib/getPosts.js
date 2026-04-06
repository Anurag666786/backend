import client from "@/api/client";

export const getPosts = async () => {
  const { data, error } = await client
    .from("posts")
    .select(
      `
      *,
      profiles:user_id (
        name
      )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) console.error(error);
  return data;
};
