"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { toast } from "sonner";
import client from "@/api/client";

const Signup = () => {
  const handleSignup = async (e) => {
    e.preventDefault();

    const email = e.target[0]?.value;
    const password = e.target[1]?.value;
    console.log(email, password);

    if (!email || !password) {
      toast.error("Please fill all the fields");
      return;
    }

    const { data, error } = await client.auth.signUp({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    if (data) {
      // If Supabase signed in automatically, sign out promptly to avoid redirect to dashboard
      if (data.session) {
        await client.auth.signOut();
      }
      toast.success("Signup successful! Please login now.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>Create a new account</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSignup}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                required
                placeholder="example@gmail.com"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" required />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded"
            >
              Signup
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Signup;
