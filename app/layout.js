"use client";
import "./globals.css";
import { AuthProvider } from "@/components/context/AuthProvider";
import { Toaster } from "sonner";
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
