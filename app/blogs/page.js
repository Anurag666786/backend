"use client";

import React, { useEffect, useState } from "react";
import { getPosts } from "@/lib/getPosts";
import NavbarB from "@/components/ui/NavbarB";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "@/hooks/useAuth";
import { deletePost } from "@/lib/deletePost";
import { toast } from "sonner";

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
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const BlogsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // NEW: selected blog state (UI only, no logic change)
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getPosts();
      setPosts(data || []);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0a0a0a] text-white">
        <div className="text-center">
          <div className="mb-6 h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent mx-auto"></div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Loading Stories...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-300 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70vw] h-[400px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <NavbarB />

      <main className="mx-auto max-w-7xl px-6 py-24 relative z-10">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-20 text-center"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold tracking-tight text-white"
          >
            Latest{" "}
            <span className="text-neutral-500 italic font-serif animate-pulse">
              Insights
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl mx-auto text-lg text-neutral-400"
          >
            Explore thoughts, stories and experiences from our creative
            community.
          </motion.p>
        </motion.div>

        {posts.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl bg-neutral-900/40 p-12 border border-neutral-800 backdrop-blur-xl">
            <div className="mb-4 text-6xl text-neutral-700">✍️</div>
            <h3 className="text-xl font-bold text-white">No stories yet</h3>
            <p className="mt-2 text-neutral-500">
              Be the first one to share something amazing!
            </p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
          >
            {posts.map((post) => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group cursor-pointer rounded-3xl border border-neutral-800 bg-neutral-900/40 backdrop-blur-xl overflow-hidden transition-all duration-500"
                onClick={() => setSelectedPost(post)}
              >
                {post.image_url && (
                  <div className="overflow-hidden">
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                )}

                <div className="p-7 flex flex-col h-full">
                  <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500">
                    <span>
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                    <span>•</span>
                    <span className="text-white">
                      {post.profiles?.name || "Unknown Author"}
                    </span>
                  </div>

                  <h2 className="text-2xl font-semibold text-white mb-3 group-hover:text-neutral-300 transition">
                    {post.title}
                  </h2>

                  <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3 flex-grow">
                    {post.content}
                  </p>

                  <div className="mt-6 flex items-center justify-between pt-5 border-t border-neutral-800">
                    <span className="text-xs tracking-widest uppercase text-neutral-500">
                      Read Story
                    </span>
                    <span className="text-lg group-hover:translate-x-1 transition">
                      →
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
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
                    {selectedPost.profiles?.name || "Unknown Author"}
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

                  {/* DELETE BUTTON (ONLY OWNER) */}
                  {user?.id === selectedPost.user_id && (
                    <button
                      id="delete-post-btn"
                      onClick={async () => {
                        const confirmDelete = confirm(
                          "Are you sure you want to delete this post? This action cannot be undone.",
                        );
                        if (!confirmDelete) return;

                        const { error } = await deletePost(selectedPost.id);

                        if (error) {
                          toast.error(`Error: ${error.message}`);
                        } else {
                          toast.success("Post deleted successfully!");
                          setPosts((prev) =>
                            prev.filter((p) => p.id !== selectedPost.id),
                          );
                          setSelectedPost(null);
                        }
                      }}
                      className="px-8 py-3 rounded-full bg-red-600/10 border border-red-500/50 hover:bg-red-600 text-red-500 hover:text-white text-sm font-medium transition-all duration-300"
                    >
                      Delete Blog
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogsPage;
