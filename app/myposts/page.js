"use client";

import React, { useEffect, useState } from "react";
import { getMyPosts } from "@/lib/getMyPosts";
import useAuth from "@/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import NavbarB from "@/components/ui/NavbarB";
import { deletePost } from "@/lib/deletePost";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const MyPostsPage = () => {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!authLoading && user) {
      fetchMyPosts();
    }
  }, [user, authLoading]);

  const fetchMyPosts = async () => {
    setLoading(true);
    const data = await getMyPosts(user.id);
    setPosts(data || []);
    setLoading(false);
  };

  const handleDelete = async (e, postId) => {
    e.stopPropagation();
    const confirmDelete = confirm(
      "Are you sure you want to delete this post? This action cannot be undone.",
    );
    if (!confirmDelete) return;

    const { error } = await deletePost(postId);

    if (error) {
      toast.error(`Error: ${error.message}`);
    } else {
      toast.success("Post deleted successfully!");
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    }
  };

  if (authLoading || (loading && posts.length === 0)) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0a0a0a] text-white font-medium">
        <div className="text-center">
          <div className="mb-6 h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-white mx-auto"></div>
          <p className="text-neutral-400">Loading your stories...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-300 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70vw] h-[400px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <NavbarB />

      <main className="mx-auto max-w-7xl px-6 py-32 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-20 text-center"
        >
          <motion.p
            variants={itemVariants}
            className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-4"
          >
            Manage Content
          </motion.p>
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6"
          >
            My{" "}
            <span className="text-neutral-500 italic animate-pulse">
              Stories
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-2xl mx-auto text-lg text-neutral-400"
          >
            A collection of all the thoughts and insights you have shared with
            the community.
          </motion.p>
        </motion.div>

        {/* Profile Details Section */}
        {user && (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="mb-12 inline-flex flex-col items-center sm:flex-row gap-6 px-8 py-6 rounded-3xl border border-neutral-800 bg-neutral-900/40 backdrop-blur-xl"
          >
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800 flex items-center justify-center text-2xl font-bold text-white border border-neutral-700 shadow-inner">
              {user.user_metadata?.name?.charAt(0) ||
                user.email?.charAt(0) ||
                "U"}
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold text-white mb-1">
                {user.user_metadata?.name || "Member"}
              </h2>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm text-neutral-500">
                <span>{user.email}</span>
                <span className="hidden sm:inline text-neutral-700">•</span>
                <span>
                  {posts.length} {posts.length === 1 ? "Story" : "Stories"}{" "}
                  Shared
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {posts.length === 0 ? (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center rounded-3xl border border-neutral-800 bg-neutral-900/40 p-16 text-center backdrop-blur-xl"
          >
            <div className="mb-6 text-5xl">🌑</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No posts found
            </h3>
            <p className="text-neutral-500 mb-8">
              You haven't shared any stories yet.
            </p>
            <button
              onClick={() => router.push("/createblog")}
              className="px-8 py-3 rounded-full bg-white text-black font-medium hover:bg-neutral-200 transition-colors"
            >
              Create Your First Post
            </button>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {posts.map((post) => (
                <motion.article
                  key={post.id}
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -5 }}
                  className="group relative flex flex-col h-full rounded-3xl border border-neutral-800 bg-neutral-900/40 p-7 backdrop-blur-xl transition-all duration-300"
                >
                  {post.image_url && (
                    <div className="relative mb-6 aspect-video overflow-hidden rounded-2xl shrink-0">
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  )}

                  <div className="flex flex-col flex-grow">
                    <h2 className="text-xl font-semibold text-white mb-3 line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-sm text-neutral-400 leading-relaxed mb-8 line-clamp-3">
                      {post.content}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-neutral-800/50">
                      <span className="text-xs tracking-widest text-neutral-500 uppercase">
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>

                      <button
                        onClick={(e) => handleDelete(e, post.id)}
                        className="p-2.5 rounded-full bg-red-600/10 text-red-500 border border-red-500/20 hover:bg-red-600 hover:text-white transition-all duration-300"
                        title="Delete Post"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default MyPostsPage;
