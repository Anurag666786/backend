"use client";

import React, { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import client from "@/api/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { uploadImage } from "@/lib/uploadImage";
import { createPost } from "@/lib/createPost";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const CreateBlog = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
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
      <div className="flex h-screen items-center justify-center bg-black text-white">
        <h1 className="text-xl animate-pulse">Loading...</h1>
      </div>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-neutral-300 relative overflow-hidden px-6 py-30">
      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70vw] h-[400px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto space-y-12 relative z-10"
      >
        {/* Header Card */}
        <motion.div
          variants={itemVariants}
          className="relative rounded-3xl border border-neutral-800 bg-neutral-900/60 backdrop-blur-xl p-8 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-neutral-500">
                Dashboard
              </p>

              <h1 className="text-3xl md:text-4xl font-bold text-white mt-2">
                Welcome back,{" "}
                <span className="text-neutral-400 animate-pulse">
                  {user.user_metadata?.name}
                </span>
              </h1>

              <p className="text-sm text-neutral-500 mt-2">{user.email}</p>
            </div>

            <button
              onClick={handleLogout}
              className="group relative px-6 py-3 rounded-xl text-sm font-medium bg-white text-black hover:bg-neutral-200 transition-all duration-300"
            >
              Sign out
              <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition bg-white/20 blur-md"></span>
            </button>
          </div>
        </motion.div>

        {/* Create Post */}
        <motion.div
          variants={itemVariants}
          className="relative rounded-3xl border border-neutral-800 bg-neutral-900/60 backdrop-blur-xl p-8 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

          <h2 className="text-2xl font-semibold text-white mb-6">
            Create a new post
          </h2>

          <div className="space-y-5">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-black/40 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white/20 transition"
            />

            <textarea
              placeholder="Write your thoughts..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="w-full bg-black/40 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white/20 transition resize-none"
            />

            <div className="flex items-center justify-between gap-4 flex-wrap">
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-neutral-800 file:text-white hover:file:bg-neutral-700 transition"
              />

              <motion.button
                whileTap={{ scale: 0.96 }}
                whileHover={{ scale: 1.03 }}
                onClick={handleCreatePost}
                className="group relative px-6 py-3 rounded-xl text-sm font-medium bg-white text-black transition-all duration-300"
              >
                Publish
                <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition bg-white/20 blur-md"></span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default CreateBlog;
