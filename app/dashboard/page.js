"use client";

import React, { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import client from "@/api/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { uploadImage } from "@/lib/uploadImage";
import { createPost } from "@/lib/createPost";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/"); // better than push for redirects
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    const { error } = await client.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out successfully");
      router.push("/");
    }
  };
  const handleCreatePost = async () => {
    let imageUrl = null;

    if (image) {
      imageUrl = await uploadImage(image);
    }

    const { data, error } = await createPost({
      title,
      content,
      imageUrl,
    });

    if (data) {
      toast.success("Post created!");
      setTitle("");
      setContent("");
      setImage(null);
    }
    if (error) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-2xl font-semibold text-gray-700">Loading...</h1>
      </div>
    );
  }

  // Prevent UI flash while redirecting
  if (!user) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6 font-sans">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl transition-all duration-300 hover:shadow-3xl">
        <h1 className="mb-6 text-center text-4xl font-extrabold tracking-tight text-gray-900">
          Dashboard
        </h1>
        <div className="space-y-6 text-center">
          <div className="space-y-1">
            <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
              Welcome back
            </p>
            <p className="text-lg font-bold text-gray-800">
              {user.user_metadata?.name}
            </p>
            <p className="text-lg font-bold text-gray-800">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="group relative flex w-full justify-center rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="mt-10 w-full max-w-2xl bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Create Blog</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-3"
        />

        <button
          onClick={handleCreatePost}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
