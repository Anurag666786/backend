"use client";

import React, { useEffect, useState } from "react";
import { getPosts } from "@/lib/getPosts";
import NavbarB from "@/components/ui/NavbarB";

const BlogsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-black border-t-transparent mx-auto"></div>
          <h1 className="text-2xl font-semibold text-gray-700 font-sans tracking-tight">
            Loading Stories...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <NavbarB />
      
      <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            Latest <span className="text-gray-500 italic font-serif">Insights</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-500">
            Explore thoughts, stories and experiences from our creative community.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl bg-white p-12 shadow-sm border border-gray-100">
            <div className="mb-4 text-6xl text-gray-200">✍️</div>
            <h3 className="text-xl font-bold text-gray-900">No stories yet</h3>
            <p className="mt-2 text-gray-500">Be the first one to share something amazing!</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                {post.image_url && (
                  <div className="overflow-hidden">
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                )}
                
                <div className="flex flex-1 flex-col p-8">
                  <div className="mb-4 flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    <span>•</span>
                    <span className="text-black">{post.profiles?.name || "Unknown Author"}</span>
                  </div>
                  
                  <h2 className="mb-3 text-2xl font-bold leading-tight text-gray-900 group-hover:text-black transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="mb-8 flex-1 text-base leading-relaxed text-gray-500 line-clamp-3">
                    {post.content}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-100/50">
                    <button className="text-sm font-bold uppercase tracking-widest text-black group-hover:underline underline-offset-4">
                      Read Story
                    </button>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-xl transition-colors group-hover:bg-black group-hover:text-white">
                      →
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default BlogsPage;
