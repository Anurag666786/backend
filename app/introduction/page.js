"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// --- Mock Data ---
const featuredPosts = [
  {
    id: 1,
    title: "The Architecture of Tomorrow",
    excerpt:
      "Exploring how brutalism and sustainable design are merging to create the cities of our future.",
    category: "Design",
    date: "Oct 24, 2026",
    readTime: "5 min read",
    image:
      "https://plus.unsplash.com/premium_photo-1726840832490-c5e188a900f4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Silence in the Digital Age",
    excerpt:
      "Why stepping away from the algorithmic noise is the ultimate luxury of the modern era.",
    category: "Lifestyle",
    date: "Oct 21, 2026",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=799&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Mastering the Craft",
    excerpt:
      "A deep dive into the philosophy of deep work, focus, and producing your life's best work.",
    category: "Productivity",
    date: "Oct 18, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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
    // Smooth, premium easing
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-neutral-300 selection:bg-neutral-800 selection:text-white relative overflow-hidden">
      {/* Ambient Premium Glow Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[500px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

      {/* Navigation (Simplified for page demo) */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto relative z-10"
      ></motion.nav>

      <div className="max-w-7xl mx-auto px-8 pt-32 pb-24 relative z-10">
        {/* Hero Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mb-32"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold tracking-tighter text-white leading-[1.1] mb-6"
          >
            Ideas that shape <br className="hidden md:block" />
            <span className="text-neutral-500 animate-pulse">
              the modern mind.
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-neutral-400 leading-relaxed max-w-2xl mb-10"
          >
            A curated space for deep thinkers, creators, and restless minds.
            Exploring the intersection of design, technology, and intentional
            living.
          </motion.p>

          {/* Get Started Button */}
          <motion.div variants={itemVariants}>
            <button className="group relative inline-flex items-center justify-center px-9 py-3 text-md font-medium text-black bg-white/100 border border-white/10 rounded-xl backdrop-blur-md hover:bg-white/70 transition-all duration-300">
              <Link
                href="https://backend-n546l9pjo-anurag-developers.vercel.app/"
                className="relative z-10"
              >
                Get Started →
              </Link>

              {/* Subtle glow effect */}
              <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 bg-white/10 blur-md"></span>
            </button>
          </motion.div>
        </motion.div>

        {/* Featured Posts Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.2 }}
          className="space-y-12"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between border-b border-neutral-800 pb-4"
          >
            <h2 className="text-sm uppercase tracking-widest font-semibold text-neutral-500">
              Selected Works
            </h2>
            <Link
              href="https://backend-n546l9pjo-anurag-developers.vercel.app/"
              className="text-sm hover:text-white transition-colors flex items-center gap-2"
            >
              View all <span className="text-lg">→</span>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                className="group cursor-pointer flex flex-col h-full"
              >
                <div className="mb-4 overflow-hidden rounded-xl bg-neutral-900 aspect-[4/3] relative">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Overlay (fixed) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
                <div className="flex flex-col flex-grow">
                  <div className="flex items-center gap-3 text-xs font-medium text-neutral-500 mb-3">
                    <span>{post.category}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-700" />
                    <span>{post.date}</span>
                  </div>

                  <h3 className="text-2xl font-semibold tracking-tight text-white mb-3 group-hover:text-neutral-300 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-neutral-400 text-sm leading-relaxed mb-6 flex-grow">
                    {post.excerpt}
                  </p>

                  <div className="text-xs font-medium text-neutral-500 mt-auto">
                    {post.readTime}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>

      {/* --- Editorial Highlight Section --- */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="relative py-32 px-8 max-w-7xl mx-auto space-y-12"
      >
        <motion.div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <h2 className="text-sm uppercase tracking-widest font-semibold text-neutral-500">
            Editor's Choice
          </h2>
          <Link
            href="https://backend-n546l9pjo-anurag-developers.vercel.app/"
            className="text-sm hover:text-white transition-colors flex items-center gap-2"
          >
            View all <span className="text-lg">→</span>
          </Link>
        </motion.div>
        {/* Background glow */}
        <div className="absolute inset-0 flex justify-center pointer-events-none">
          <div className="w-[600px] h-[400px] bg-white/[0.03] blur-[140px] rounded-full" />
        </div>

        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-2xl group"
          >
            <Image
              src="https://images.unsplash.com/photo-1501139083538-0139583c060f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Editorial"
              width={800}
              height={600}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-1000 ease-out"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.9 }}
          >
            <span className="text-xs uppercase tracking-widest text-neutral-500 font-medium">
              Editorial Pick
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mt-4 mb-6">
              The art of slowing <br />
              <span className="text-neutral-500">down in a fast world.</span>
            </h2>

            <p className="text-neutral-400 text-lg leading-relaxed mb-8 max-w-xl">
              In a culture obsessed with speed, the ability to pause, reflect,
              and think deeply becomes a competitive advantage — and a personal
              luxury.
            </p>

            <div className="flex items-center gap-6">
              <Link
                href="#"
                className="px-6 py-3 border border-neutral-700 text-white text-sm font-medium rounded-full hover:bg-white hover:text-black transition-all duration-300"
              >
                Read Story
              </Link>

              <span className="text-sm text-neutral-500">10 min read</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="relative py-32 px-8 max-w-7xl mx-auto"
      >
        {/* Background glow */}
        <div className="absolute inset-0 flex justify-center pointer-events-none">
          <div className="w-[600px] h-[400px] bg-white/[0.03] blur-[140px] rounded-full" />
        </div>

        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-2xl group"
          >
            <Image
              src="https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Editorial"
              width={800}
              height={600}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-1000 ease-out"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.9 }}
          >
            <span className="text-xs uppercase tracking-widest text-neutral-500 font-medium">
              Editorial Pick
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mt-4 mb-6">
              Technology replacing <br />
              <span className="text-neutral-500">humans in this world.</span>
            </h2>

            <p className="text-neutral-400 text-lg leading-relaxed mb-8 max-w-xl">
              Artificial intelligence is rapidly evolving, and it is already
              impacting our lives in many ways. From automating routine tasks to
              providing personalized recommendations, AI is changing the way we
              work, play, and interact with the world around us.
            </p>

            <div className="flex items-center gap-6">
              <Link
                href="#"
                className="px-6 py-3 border border-neutral-700 text-white text-sm font-medium rounded-full hover:bg-white hover:text-black transition-all duration-300"
              >
                Read Story
              </Link>

              <span className="text-sm text-neutral-500">8 min read</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="relative py-32 px-8 max-w-7xl mx-auto"
      >
        {/* Background glow */}
        <div className="absolute inset-0 flex justify-center pointer-events-none">
          <div className="w-[600px] h-[400px] bg-white/[0.03] blur-[140px] rounded-full" />
        </div>

        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-2xl group"
          >
            <Image
              src="https://images.unsplash.com/photo-1637330765988-89f4be4ec090?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Editorial"
              width={800}
              height={600}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-1000 ease-out"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.9 }}
          >
            <span className="text-xs uppercase tracking-widest text-neutral-500 font-medium">
              Editorial Pick
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mt-4 mb-6">
              Unhealthy eating <br />
              <span className="text-neutral-500">leading to diseases.</span>
            </h2>

            <p className="text-neutral-400 text-lg leading-relaxed mb-8 max-w-xl">
              The rise of processed foods and sedentary lifestyles has led to a
              global health crisis, with obesity, diabetes, and heart disease
              becoming increasingly common.
            </p>

            <div className="flex items-center gap-6">
              <Link
                href="#"
                className="px-6 py-3 border border-neutral-700 text-white text-sm font-medium rounded-full hover:bg-white hover:text-black transition-all duration-300"
              >
                Read Story
              </Link>

              <span className="text-sm text-neutral-500">11 min read</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="relative py-32 px-8 max-w-7xl mx-auto"
      >
        {/* Background glow */}
        <div className="absolute inset-0 flex justify-center pointer-events-none">
          <div className="w-[600px] h-[400px] bg-white/[0.03] blur-[140px] rounded-full" />
        </div>

        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-2xl group"
          >
            <Image
              src="https://plus.unsplash.com/premium_photo-1683141331949-64810cfc4ca3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Editorial"
              width={800}
              height={600}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-1000 ease-out"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.9 }}
          >
            <span className="text-xs uppercase tracking-widest text-neutral-500 font-medium">
              Editorial Pick
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mt-4 mb-6">
              Esports are now <br />
              <span className="text-neutral-500">more than just a game.</span>
            </h2>

            <p className="text-neutral-400 text-lg leading-relaxed mb-8 max-w-xl">
              Esports have evolved from a niche hobby into a global phenomenon,
              with professional leagues, massive prize pools, and millions of
              viewers worldwide. luxury.
            </p>

            <div className="flex items-center gap-6">
              <Link
                href="#"
                className="px-6 py-3 border border-neutral-700 text-white text-sm font-medium rounded-full hover:bg-white hover:text-black transition-all duration-300"
              >
                Read Story
              </Link>

              <span className="text-sm text-neutral-500">9 min read</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="relative py-32 px-8 max-w-7xl mx-auto"
      >
        {/* Background glow */}
        <div className="absolute inset-0 flex justify-center pointer-events-none">
          <div className="w-[600px] h-[400px] bg-white/[0.03] blur-[140px] rounded-full" />
        </div>

        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-2xl group"
          >
            <Image
              src="https://images.unsplash.com/photo-1732633270597-a5e128aed94c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Editorial"
              width={800}
              height={600}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-1000 ease-out"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.9 }}
          >
            <span className="text-xs uppercase tracking-widest text-neutral-500 font-medium">
              Editorial Pick
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mt-4 mb-6">
              Europe's immigration crisis
              <br />
              <span className="text-neutral-500">more than just a game.</span>
            </h2>

            <p className="text-neutral-400 text-lg leading-relaxed mb-8 max-w-xl">
              The influx of migrants into Europe has sparked intense debate
              about national identity, cultural integration, and the future of
              the continent.
            </p>

            <div className="flex items-center gap-6">
              <Link
                href="#"
                className="px-6 py-3 border border-neutral-700 text-white text-sm font-medium rounded-full hover:bg-white hover:text-black transition-all duration-300"
              >
                Read Story
              </Link>

              <span className="text-sm text-neutral-500">15 min read</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* --- Premium Membership Section --- */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="relative py-36 px-8 max-w-7xl mx-auto"
      >
        {/* Ambient layered glow */}
        <div className="absolute inset-0 flex justify-center pointer-events-none">
          <div className="w-[700px] h-[400px] bg-white/[0.04] blur-[140px] rounded-full" />
        </div>

        <div className="relative z-10">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
              Go beyond reading. <br />
              <span className="text-neutral-500 animate-pulse">
                Enter the inner circle.
              </span>
            </h2>

            <p className="text-neutral-400 text-lg leading-relaxed">
              Unlock deeper insights, exclusive essays, and a distraction-free
              experience designed for those who value clarity over noise.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-10">
            {/* Free Tier */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
              className="relative border border-neutral-800 rounded-3xl p-8 bg-neutral-900/40 backdrop-blur-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

              <h3 className="text-white text-2xl font-semibold mb-4">
                Free Access
              </h3>

              <p className="text-neutral-400 mb-6 text-sm leading-relaxed">
                Thoughtful articles, curated ideas, and a minimal reading, good
                experience experience — always free.
              </p>

              <ul className="space-y-3 text-sm text-neutral-400 mb-8">
                <li>• Weekly curated articles</li>
                <li>• Clean reading experience</li>
                <li>• Limited archive access</li>
                <li>• Few ads</li>
              </ul>

              <button className="w-full py-3 border border-neutral-700 rounded-full text-sm hover:bg-white hover:text-black transition-all duration-300">
                Start Reading
              </button>
            </motion.div>

            {/* Premium Tier */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="relative rounded-3xl p-8 overflow-hidden border border-neutral-700 bg-gradient-to-b from-white/[0.06] to-white/[0.02]"
            >
              {/* Glow highlight */}
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-white/[0.08] blur-[120px]" />

              <h3 className="text-white text-2xl font-semibold mb-4">
                Premium Membership
              </h3>

              <p className="text-neutral-300 mb-6 text-sm leading-relaxed">
                A deeper layer of thinking. Exclusive essays, private drops, and
                an elevated reading environment.
              </p>

              <ul className="space-y-3 text-sm text-neutral-300 mb-8">
                <li>• Exclusive long-form essays</li>
                <li>• Full archive access</li>
                <li>• Early access to new content</li>
                <li>• Members-only insights</li>
              </ul>

              <button className="w-full py-3 bg-white text-black rounded-full text-sm font-medium hover:bg-neutral-200 transition-all duration-300">
                Upgrade to Premium
              </button>
            </motion.div>
          </div>

          {/* Bottom subtle trust line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center mt-16 text-neutral-500 text-xs tracking-wide"
          >
            No distractions. No ads. Just ideas that matter.
          </motion.div>
        </div>
      </motion.section>

      {/* --- Ultra Premium Experience Section --- */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="relative py-40 px-8 max-w-7xl mx-auto overflow-hidden"
      >
        {/* Background Glow Layers */}
        <div className="absolute inset-0 flex justify-center pointer-events-none">
          <div className="w-[800px] h-[500px] bg-white/[0.04] blur-[160px] rounded-full" />
        </div>

        <div className="relative z-10">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center max-w-4xl mx-auto mb-24"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
              Built for the <br />
              <span className="text-neutral-500 animate-pulse">
                modern intellectual.
              </span>
            </h2>

            <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto">
              Not just content. A refined environment crafted for clarity,
              focus, and depth in an age of distraction.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Clarity First",
                desc: "Every interface decision removes friction and enhances thinking.",
              },
              {
                title: "Calm Interface",
                desc: "Designed to reduce noise and elevate focus instantly.",
              },
              {
                title: "Timeless Feel",
                desc: "Aesthetic that feels relevant today — and years from now.",
              },
              {
                title: "Minimalistic Design",
                desc: "A clean, simple interface that lets the content shine.",
              },
              {
                title: "Precise Focus",
                desc: "Every element is intentional, guiding your attention to what matters.",
              },
              {
                title: "Premium Reading",
                desc: "A distraction-free environment designed for deep thinking and reflection.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                whileHover={{ scale: 1.04 }}
                className="group relative p-[1px] rounded-3xl bg-gradient-to-b from-white/10 to-transparent"
              >
                {/* Glass Card */}
                <div className="relative rounded-3xl bg-neutral-900/60 backdrop-blur-2xl p-8 h-full border border-neutral-800 overflow-hidden">
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent blur-xl" />
                  </div>

                  <h3 className="text-white text-2xl font-semibold mb-4 group-hover:text-neutral-300 transition">
                    {item.title}
                  </h3>

                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>

                  {/* Bottom subtle line */}
                  <div className="mt-8 w-12 h-[1px] bg-neutral-700 group-hover:w-20 transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* --- Premium Impact / Stats Section --- */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="relative py-36 px-8 max-w-7xl mx-auto"
      >
        {/* Ambient Glow */}
        <div className="absolute inset-0 flex justify-center pointer-events-none">
          <div className="w-[700px] h-[400px] bg-white/[0.04] blur-[140px] rounded-full" />
        </div>

        <div className="relative z-10">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
              Trusted by thinkers <br />
              <span className="text-neutral-500 animate-pulse">
                around the world.
              </span>
            </h2>

            <p className="text-neutral-400 text-lg">
              A growing community built on clarity, depth, and meaningful ideas.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { number: "120K+", label: "Monthly Readers" },
              { number: "45+", label: "Countries Reached" },
              { number: "3.2M+", label: "Articles Read" },
              { number: "98%", label: "Positive Feedback" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent"
              >
                <div className="relative rounded-2xl bg-neutral-900/60 backdrop-blur-xl border border-neutral-800 p-6 text-center overflow-hidden">
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent blur-xl" />
                  </div>

                  <motion.h3
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                    className="text-3xl md:text-4xl font-bold text-white mb-2"
                  >
                    {stat.number}
                  </motion.h3>

                  <p className="text-neutral-400 text-sm tracking-wide">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.4 }}
            className="h-[1px] bg-neutral-800 my-20"
          />

          {/* Testimonial / Quote */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed mb-6">
              “In a world full of noise, this platform feels like silence — in
              the best possible way.”
            </p>

            <span className="text-neutral-500 text-sm">— Anurag</span>
          </motion.div>
        </div>
      </motion.section>

      {/* --- Premium Insight Section --- */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative py-32 px-8 max-w-7xl mx-auto"
      >
        {/* Subtle glow */}
        <div className="absolute inset-0 flex justify-center pointer-events-none">
          <div className="w-[500px] h-[300px] bg-white/[0.04] blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
              Designed for those who <br />
              <span className="text-neutral-500 animate-pulse">
                think deeper.
              </span>
            </h2>

            <p className="text-neutral-400 text-lg leading-relaxed mb-8 max-w-xl">
              This is not just content. It’s a curated experience for people who
              value clarity, depth, and timeless ideas in a noisy digital world.
            </p>

            <div className="flex items-center gap-4">
              <Link
                href="https://backend-n546l9pjo-anurag-developers.vercel.app/"
                className="px-6 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-neutral-200 transition-all duration-300"
              >
                Explore Articles
              </Link>

              <Link
                href="./about"
                className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-2"
              >
                Learn more <span className="text-lg">→</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.2 },
              },
            }}
            className="grid gap-6"
          >
            {[
              {
                title: "Minimal Design",
                desc: "Stripping away noise to focus on what truly matters.",
              },
              {
                title: "Deep Thinking",
                desc: "Ideas that challenge assumptions and expand perspective.",
              },
              {
                title: "Timeless Content",
                desc: "Built to stay relevant beyond trends and algorithms.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7 },
                  },
                }}
                whileHover={{ scale: 1.03 }}
                className="group border border-neutral-800 rounded-2xl p-6 bg-neutral-900/40 backdrop-blur-xl hover:border-neutral-700 transition-all duration-500"
              >
                <h3 className="text-white text-xl font-semibold mb-2 group-hover:text-neutral-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
