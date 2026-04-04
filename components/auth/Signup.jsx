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
      if (data.session) {
        await client.auth.signOut();
      }
      toast.success("Signup successful! Please login now.");
    }
  };

  return (
    <div className="p-6">
      <Card className="w-full max-w-md bg-[#111111]/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40 rounded-2xl">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-semibold tracking-tight text-white">
            Create Account
          </CardTitle>
          <CardDescription className="text-sm text-gray-400">
            Enter your credentials to get started
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSignup}>
            <div className="grid gap-5">
              {/* Email */}
              <div className="grid gap-2">
                <label
                  htmlFor="email"
                  className="text-sm text-gray-300 font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="example@gmail.com"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0f0f0f] border border-white/10 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 transition-all duration-200"
                />
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <label
                  htmlFor="password"
                  className="text-sm text-gray-300 font-medium"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0f0f0f] border border-white/10 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 transition-all duration-200"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-white text-black font-medium tracking-wide 
                hover:bg-gray-200 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-white/10"
              >
                Signup
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
