"use client";

import React, { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import client from "@/api/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

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
    </div>
  );
};

export default Dashboard;
