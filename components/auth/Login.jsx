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

const Login = () => {
  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target[0]?.value;
    const name = e.target[1]?.value;
    const password = e.target[2]?.value;
    console.log(email, password, name);

    if (!email || !password || !name) {
      toast.error("Please fill all the fields");
      return;
    }

    const { data, error } = await client.auth.signInWithPassword({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (data) {
      toast.success("Login successful!");
    }
    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>welcome</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleLogin}>
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
              <label htmlFor="name">Name</label>
              <input
                type="name"
                id="name"
                required
                placeholder="your username"
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
              Login
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
