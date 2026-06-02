"use client";

import React, { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import client from "@/api/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { uploadImage } from "@/lib/uploadImage";
import { createPost } from "@/lib/createPost";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

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
                Begin your journey by writing blogs
              </p>

              <h1 className="text-3xl md:text-4xl font-bold text-white mt-2">
                Welcome{" "}
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

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 relative rounded-[1.5rem] overflow-hidden border border-border/50 bg-card/60 backdrop-blur-xl shadow-2xl"
        >
          {/* Animated Background gradients inside CTA */}
          <div className="absolute inset-0 border-neutral-800 bg-neutral-900/60 backdrop-blur-xl p-8 overflow-hidden" />
          <motion.div
            animate={{ x: ["0%", "50%", "0%"], y: ["0%", "30%", "0%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl"
          />

          <div className="relative p-10 md:p-16 lg:p-10 text-center md:flex md:items-center md:justify-between md:text-left z-10">
            <div className="md:w-2/3">
              <h2 className="text-3xl md:text-4xl lg:text-2xl font-bold text-foreground mb-3 tracking-tight">
                Want to see your posts?
              </h2>
              <p className="text-lg lg:text-xl text-muted-foreground/90 max-w-xl">
                Visit or manage your all blogs you have created by clicking here
                or selecting My Blogs in navbar.
              </p>
            </div>
            <div className="mt-10 md:mt-0 flex justify-center md:justify-end md:w-1/3">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-5 bg-foreground text-background font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <Link href="./myposts">Check out</Link>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default CreateBlog;
