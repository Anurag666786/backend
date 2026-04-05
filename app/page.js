"use client";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Auth from "@/components/auth/Auth";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/blogs");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-2xl font-semibold">Loading...</h1>
      </div>
    );
  }

  if (user) {
    return null; // Or a simple redirecting message
  }

  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md">
        {loading ? <h1>loading...</h1> : <Auth />}
      </div>
    </div>
  );
}
