"use client";

import React, { useEffect, useState } from "react";
import { getMyPosts } from "@/lib/getMyPosts";
import useAuth from "@/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import NavbarB from "@/components/ui/NavbarB";
import client from "@/api/client";
import { deletePost } from "@/lib/deletePost";
import { toast } from "sonner";
import { Trash2, LogOut } from "lucide-react";

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
  const [selectedPost, setSelectedPost] = useState(null);

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
  const handleLogout = async () => {
    const { error } = await client.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out successfully");
      router.push("/");
    }
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
            className="mb-12 flex flex-col md:flex-row items-center justify-between gap-8 px-8 py-6 rounded-3xl border border-neutral-800 bg-neutral-900/40 backdrop-blur-xl"
          >
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-neutral-700 to-neutral-800 flex items-center justify-center text-3xl font-bold text-white border border-neutral-700 shadow-2xl relative group overflow-hidden shrink-0">
                <span className="relative z-10 uppercase">
                  {user.user_metadata?.name?.charAt(0) ||
                    user.email?.charAt(0) ||
                    "U"}
                </span>
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
                  {user.user_metadata?.name || "Member"}
                </h2>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-sm text-neutral-400">
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-800/50 border border-neutral-700/50 transition-colors hover:border-neutral-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="truncate max-w-[200px]">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-800/50 border border-neutral-700/50 text-neutral-300 transition-colors hover:border-neutral-600">
                    <span className="font-bold text-white">{posts.length}</span>
                    <span>
                      {posts.length === 1 ? "Story" : "Stories"} Shared
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="group relative flex items-center gap-2.5 px-6 py-3 rounded-2xl text-sm font-semibold bg-white text-black hover:bg-neutral-200 transition-all duration-300 shadow-xl shadow-white/5 active:scale-[0.98]"
            >
              <LogOut size={16} />
              <span>Sign out</span>
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 bg-white/10 blur-xl -z-10" />
            </button>
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
                  onClick={() => setSelectedPost(post)}
                  className="group relative flex flex-col h-full rounded-3xl border border-neutral-800 bg-neutral-900/40 p-7 backdrop-blur-xl transition-all duration-300 cursor-pointer"
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
                        title="Delete Blog"
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

      {/* ================= FULL BLOG VIEW (NEW) ================= */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl"
            >
              {/* Image */}
              {selectedPost.image_url && (
                <div className="overflow-hidden rounded-t-3xl">
                  <img
                    src={selectedPost.image_url}
                    alt={selectedPost.title}
                    className="w-full object-cover max-h-[400px]"
                  />
                </div>
              )}

              <div className="p-8">
                <div className="mb-4 text-xs uppercase tracking-widest text-neutral-500">
                  {new Date(selectedPost.created_at).toLocaleDateString()} •{" "}
                  <span className="text-white">
                    {user?.user_metadata?.name || "Me"}
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {selectedPost.title}
                </h1>

                <p className="text-neutral-300 leading-relaxed whitespace-pre-line">
                  {selectedPost.content}
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-4 pt-8 border-t border-neutral-800">
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="px-8 py-3 rounded-full border border-neutral-700 text-sm font-medium hover:bg-white hover:text-black transition-all duration-300"
                  >
                    Close
                  </button>

                  {/* DELETE BUTTON */}
                  <button
                    id="delete-post-btn-modal"
                    onClick={async (e) => {
                      e.stopPropagation();
                      await handleDelete(e, selectedPost.id);
                      setSelectedPost(null);
                    }}
                    className="px-8 py-3 rounded-full bg-red-600/10 border border-red-500/50 hover:bg-red-600 text-red-500 hover:text-white text-sm font-medium transition-all duration-300"
                  >
                    Delete Post
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyPostsPage;
