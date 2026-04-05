"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Pencil,
  Eye,
  Palette,
  Search,
  BarChart3,
  Users,
  ChevronRight,
  Zap,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    id: "editor",
    title: "Intuitive Markdown Editing",
    description:
      "Write effortlessly with a distraction-free editor that supports rich markdown syntax, shortcuts, and inline styling.",
    icon: Pencil,
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-500/10",
    iconColor: "text-blue-600 dark:text-blue-400",
    delay: 0.1,
  },
  {
    id: "preview",
    title: "Real-Time Live Preview",
    description:
      "See your changes instantly. Our ultra-fast preview updates synchronously as you type your thoughts into reality.",
    icon: Eye,
    color: "from-emerald-400 to-teal-500",
    bgColor: "bg-emerald-500/10",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    delay: 0.2,
  },
  {
    id: "themes",
    title: "Bespoke Custom Themes",
    description:
      "Personalize your reading and writing experience with meticulously crafted dark and light modes, plus custom accents.",
    icon: Palette,
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-500/10",
    iconColor: "text-pink-600 dark:text-pink-400",
    delay: 0.3,
  },
  {
    id: "seo",
    title: "Advanced SEO Tools",
    description:
      "Rank higher naturally. Built-in metadata management, auto-generated sitemaps, and performance optimizations.",
    icon: Search,
    color: "from-amber-400 to-orange-500",
    bgColor: "bg-amber-500/10",
    iconColor: "text-amber-600 dark:text-amber-500",
    delay: 0.4,
  },
  {
    id: "analytics",
    title: "Deep Analytics Engine",
    description:
      "Understand your audience. Track page views, read times, and demographic data without compromising privacy.",
    icon: BarChart3,
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-500/10",
    iconColor: "text-violet-600 dark:text-violet-400",
    delay: 0.5,
  },
  {
    id: "community",
    title: "Engaged Community",
    description:
      "Spark conversations with built-in nested comments, claps, and social sharing to grow your loyal audience.",
    icon: Users,
    color: "from-cyan-400 to-blue-500",
    bgColor: "bg-cyan-500/10",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    delay: 0.6,
  },
];

export default function FeaturesPage() {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center pt-24 pb-20">
      {/* Dynamic Background Elements - Custom URL & Glassmorphism */}
      <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
        {/* Custom Background Image via URL (using style prop avoids Tailwind arbitrary URL parsing bugs) */}

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[30%] -right-[10%] w-[70vw] h-[70vw] rounded-full  blur-[120px] mix-blend-screen overflow-hidden"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-emerald-500/10 to-cyan-500/10 blur-[120px] mix-blend-screen overflow-hidden"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center justify-center gap-2 mb-6"
          ></motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-8"
            style={{ lineHeight: 1.1 }}
          >
            Everything you need to{" "}
            <span className="bg-clip-text text-neutral-500 animate-pulse">
              publish beautifully
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            We've meticulously crafted every detail so you can focus on what
            matters most — your words. Discover tools that empower your
            creativity and grow your audience.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            const isHovered = hoveredFeature === feature.id;

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{
                  duration: 0.7,
                  delay: feature.delay,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onMouseEnter={() => setHoveredFeature(feature.id)}
                onMouseLeave={() => setHoveredFeature(null)}
                className="group relative h-full"
              >
                {/* Connecting glow element behind the card */}
                <div
                  className={`absolute -inset-0.5 rounded-[2rem] blur-xl opacity-0 transition duration-500 group-hover:opacity-30 bg-gradient-to-br ${feature.color}`}
                ></div>

                <div className="relative h-full flex flex-col bg-card/80 border border-border/50 hover:border-border rounded-[2rem] p-8 overflow-hidden backdrop-blur-xl transition duration-500 shadow-sm hover:shadow-xl">
                  {/* Inner subtle glow for extra premium feel */}
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${feature.color} opacity-5 blur-2xl rounded-full translate-x-10 -translate-y-10 group-hover:opacity-20 transition-opacity duration-500`}
                  ></div>

                  {/* Top Accents */}
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div
                      className={`p-4 rounded-2xl ${feature.bgColor} transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 shadow-inner`}
                    >
                      <Icon
                        className={`w-8 h-8 ${feature.iconColor}`}
                        strokeWidth={1.75}
                      />
                    </div>
                    <motion.div
                      animate={{
                        x: isHovered ? 0 : -10,
                        opacity: isHovered ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="mt-2"
                    >
                      <Zap className={`w-5 h-5 ${feature.iconColor}`} />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="mt-4 flex-grow relative z-10">
                    <h3 className="text-2xl font-bold text-foreground mb-4 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-foreground group-hover:to-muted-foreground transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {feature.description}
                    </p>
                  </div>

                  {/* Bottom Interaction */}
                  <div className="mt-10 flex items-center text-sm font-semibold opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 relative z-10">
                    <span
                      className={`text-transparent bg-clip-text bg-gradient-to-r ${feature.color}`}
                    >
                      Explore capability
                    </span>
                    <ChevronRight
                      className={`ml-1 w-4 h-4 ${feature.iconColor}`}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-32 relative rounded-[2.5rem] overflow-hidden border border-border/50 bg-card/60 backdrop-blur-xl shadow-2xl"
        >
          {/* Animated Background gradients inside CTA */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent pointer-events-none" />
          <motion.div
            animate={{ x: ["0%", "50%", "0%"], y: ["0%", "30%", "0%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          />

          <div className="relative p-12 md:p-16 lg:p-20 text-center md:flex md:items-center md:justify-between md:text-left z-10">
            <div className="md:w-2/3">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-tight">
                Ready to elevate your writing?
              </h2>
              <p className="text-lg lg:text-xl text-muted-foreground/90 max-w-xl">
                Join a global community of creators publishing their best work
                with our premium tools. Experience the difference today.
              </p>
            </div>
            <div className="mt-10 md:mt-0 flex justify-center md:justify-end md:w-1/3">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-5 bg-foreground text-background font-bold text-lg rounded-full shadow-xl hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <Link href="https://backend-n546l9pjo-anurag-developers.vercel.app/">
                  Start Writing Now
                </Link>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
