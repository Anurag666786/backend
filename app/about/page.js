"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
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

// Animation system (same feel as homepage)
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-neutral-300 overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[500px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

      {/* ================= HERO ================= */}
      <motion.section
        variants={container}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-8 pt-32 pb-24"
      >
        <motion.h1
          variants={item}
          className="text-5xl md:text-7xl text-center items-center justify-center font-bold text-white tracking-tight leading-[1.1] mb-6"
        >
          A space built for <br />
          <span className="text-neutral-500 animate-pulse">deep thinking</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="text-lg md:text-xl text-center mx-auto text-neutral-400 max-w-2xl leading-relaxed"
        >
          This platform is not just about content. It’s about clarity, focus,
          and meaningful ideas in a world overwhelmed by noise.
        </motion.p>
      </motion.section>

      {/* ================= STORY ================= */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative py-28 px-8 max-w-6xl mx-auto"
      >
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative overflow-hidden rounded-2xl group"
          >
            <Image
              src="https://images.unsplash.com/photo-1503945438517-f65904a52ce6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Story"
              width={800}
              height={600}
              className="object-cover group-hover:scale-105 transition duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Why this exists
            </h2>

            <p className="text-neutral-400 leading-relaxed mb-6">
              In a fast, algorithm-driven world, depth is disappearing. This
              platform was created to bring back thoughtful writing, meaningful
              ideas, and intentional reading.
            </p>

            <p className="text-neutral-400 leading-relaxed">
              Every article is designed to slow you down — not speed you up.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* ================= VALUES ================= */}
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="visible"
        className="py-32 px-8 max-w-6xl mx-auto"
      >
        <motion.h2
          variants={item}
          className="text-4xl md:text-5xl text-white font-bold mb-16"
        >
          What we believe
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Clarity",
              desc: "Remove noise. Focus only on what truly matters.",
            },
            {
              title: "Depth",
              desc: "Not content for clicks — but ideas that stay.",
            },
            {
              title: "Timelessness",
              desc: "Built to outlast trends and algorithms.",
            },
            {
              title: "Simplicity",
              desc: "Minimal design. Maximum focus.",
            },
            {
              title: "Intentionality",
              desc: "Every piece is written with purpose.",
            },
            {
              title: "Quality over Quantity",
              desc: "Fewer articles. Deeper impact.",
            },
            {
              title: "Focus",
              desc: "Fewer articles. Deeper impact.",
            },
            {
              title: "Interactive UI",
              desc: "Smooth animations and transitions.",
            },
            {
              title: "Responsive Design",
              desc: "Works seamlessly on all devices.",
            },
          ].map((val, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ scale: 1.05 }}
              className="p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent"
            >
              <div className="bg-neutral-900/60 backdrop-blur-xl border border-neutral-800 rounded-2xl p-6">
                <h3 className="text-white text-xl font-semibold mb-2">
                  {val.title}
                </h3>
                <p className="text-neutral-400 text-sm">{val.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ================= EXPERIENCE ================= */}
      <motion.section
        className="py-32 px-8 max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              A premium reading experience
            </h2>

            <p className="text-neutral-400 leading-relaxed mb-6">
              Designed with intention — from typography to spacing — everything
              is crafted to help you think clearly and read deeply.
            </p>

            <Link
              href="./blogs"
              className="inline-block px-6 py-3 bg-white text-black rounded-full text-sm font-medium hover:bg-neutral-200 transition"
            >
              Explore Articles →
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative overflow-hidden rounded-2xl group"
          >
            <Image
              src="https://plus.unsplash.com/premium_photo-1661339265887-be15949790ff?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Reading"
              width={800}
              height={600}
              className="object-cover group-hover:scale-105 transition duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </motion.div>
        </div>
      </motion.section>

      {/* ================= CTA ================= */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="py-36 px-8 max-w-4xl mx-auto text-center"
      >
        <h2 className="text-5xl font-bold text-white mb-6">
          Join the thinkers.
        </h2>

        <p className="text-neutral-400 mb-10">
          Not for everyone—only for those who choose depth over noise, clarity
          over chaos, and meaning over mere distraction. This platform is built
          for individuals who seek more than just surface-level content, who
          believe that true knowledge comes from thoughtful exploration, honest
          expression, and a willingness to engage with ideas that challenge and
          inspire. In a world overflowing with information, we focus on what
          truly matters—insight, perspective, and purposeful conversations that
          leave a lasting impact. If you are someone who values learning,
          growth, and authenticity, then this is your space. Join this community
          not just as a reader, but as a contributor, a thinker, and a core part
          of a growing family that believes in the power of meaningful
          content.{" "}
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="py-36 px-8 max-w-4xl mx-auto text-center"
      >
        <h2 className="text-5xl font-bold text-white mb-6">
          Anurag Developers ©
        </h2>

        <p className="text-neutral-400 mb-10">
          Anurag Developers © is a professional web development firm committed
          to delivering enterprise-grade digital solutions that drive measurable
          business outcomes. We design and develop high-performance web
          applications tailored to meet the evolving demands of modern
          organizations. Our expertise spans full-stack development, scalable
          architecture, performance optimization, and user-centric interface
          design. Every solution we build is engineered with precision, ensuring
          reliability, security, and long-term sustainability. We emphasize
          clean code standards, structured development processes, and strategic
          execution to guarantee quality at every stage of the project
          lifecycle. At Anurag Developers, we understand that technology is not
          just about functionality — it is about enabling growth, efficiency,
          and competitive advantage. Our development approach is guided by
          careful analysis, technical excellence, and a commitment to delivering
          solutions that align with our clients’ strategic objectives. We
          collaborate closely with businesses to transform complex challenges
          into streamlined digital systems. From concept to deployment, our team
          prioritizes transparency, accountability, and consistent communication
          to ensure successful project delivery. With a focus on innovation,
          operational excellence, and long-term value creation, Anurag
          Developers serves as a trusted technology partner for organizations
          seeking dependable, scalable, and future-ready web solutions.{" "}
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-6xl mx-auto px-8 pb-32"
      >
        <div className="relative rounded-[2.5rem] overflow-hidden border border-neutral-800 bg-neutral-900/40 backdrop-blur-2xl shadow-2xl">
          {/* Animated Background gradients inside CTA */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
          <motion.div
            animate={{ x: ["0%", "50%", "0%"], y: ["0%", "30%", "0%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl"
          />

          <div className="relative p-12 md:p-16 lg:p-20 text-center md:flex md:items-center md:justify-between md:text-left z-10">
            <div className="md:w-2/3">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                Join us now for the best web Solutions and Production builts.
              </h2>
              <p className="text-lg text-neutral-400 max-w-xl">
                We build fast, scalable, and secure web applications tailored to
                your business needs. From custom web development to enterprise
                solutions, our team delivers high-quality results that drive
                growth and innovation. Let's create something extraordinary
                together.
              </p>
            </div>
            <div className="mt-10 md:mt-0 flex justify-center md:justify-end md:w-1/3">
              <Link
                href="https://anurag-developers.vercel.app/"
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-neutral-200 transition-all duration-300"
              >
                Join Us
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
