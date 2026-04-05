import client from "@/api/client";

export const uploadImage = async (file) => {
  const fileName = `${Date.now()}-${file.name}`;

  const { data, error } = await client.storage
    .from("blog-images")
    .upload(fileName, file);

  if (error) {
    console.error(error);
    return null;
  }

  // Get public URL
  const { data: publicUrl } = client.storage
    .from("blog-images")
    .getPublicUrl(fileName);

  return publicUrl.publicUrl;
};
