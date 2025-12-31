import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";
import ParticlesBackgrounds from "../components/ParticlesBackground";
import avator from "../assets/avator.png";

/* ================= DATA ================= */

const roles = [
  "Frontend Developer",
  "React Developer",
  "UI Designer",
  "MERN Stack Developer",
  "Full Stack JavaScript Developer",
  "Node.js Backend Developer",
  "MongoDB Database Developer",
  "Express.js API Developer",
];

const socials = [
  {
    Icon: FaInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/balaji_patil_8704",
  },
  {
    Icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/balaji-patil-73b288320/",
  },
  {
    Icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/BalajiPatil1207",
  },
];

const glowVariants = {
  initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" },
  hover: {
    scale: 1.2,
    y: -3,
    filter:
      "drop-shadow(0 0 8px rgba(13,88,204,0.9)) drop-shadow(0 0 18px rgba(16,185,129,0.8))",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: { scale: 0.95, y: 0, transition: { duration: 0.08 } },
};

/* ================= COMPONENT ================= */

const Home = () => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  /* Typing Effect */
  useEffect(() => {
    const currentText = roles[index];

    const timeout = setTimeout(
      () => {
        if (!deleting && subIndex < currentText.length) {
          setSubIndex((prev) => prev + 1);
        } else if (!deleting && subIndex === currentText.length) {
          setTimeout(() => setDeleting(true), 1200);
        } else if (deleting && subIndex > 0) {
          setSubIndex((prev) => prev - 1);
        } else if (deleting && subIndex === 0) {
          setDeleting(false);
          setIndex((prev) => (prev + 1) % roles.length);
        }
      },
      deleting ? 40 : 60
    );

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting]);

  return (
    <section
      id="home"
      className="relative w-full h-screen bg-black overflow-x-hidden"
    >
      {/* Particles */}
      <div className="hidden lg:block">
        <ParticlesBackgrounds />
      </div>

      {/* Gradient Blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute -top-32 -left-32 w-[70vw] sm:w-[50vw] md:w-[40vw]
          h-[70vw] sm:h-[50vw] md:h-[40vw] max-w-[500px] max-h-[500px]
          rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
          opacity-30 sm:opacity-20 md:opacity-10 blur-[120px] animate-pulse"
        />

        <div
          className="absolute bottom-0 right-0 w-[70vw] sm:w-[50vw] md:w-[40vw]
          h-[70vw] sm:h-[50vw] md:h-[40vw] max-w-[500px] max-h-[500px]
          rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
          opacity-30 sm:opacity-20 md:opacity-10 blur-[120px] animate-pulse delay-500"
        />
      </div>

      {/* MAIN GRID */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 items-center">
        {/* ================= LEFT CONTENT ================= */}
        <div className="max-w-xl">
          {/* Typing */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-3xl
            font-semibold text-white tracking-wide min-h-[1.6em]"
          >
            {roles[index].substring(0, subIndex)}
            <span className="animate-pulse">|</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl
            font-bold text-transparent bg-clip-text bg-gradient-to-r
            from-[#1cd8d2] via-[#00bf8f] to-[#302b63]"
          >
            Hello, I’m
            <br />
            <span className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl whitespace-nowrap">
              Balaji Patil
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 text-base sm:text-lg md:text-xl text-gray-300"
          >
            I turn complex ideas into seamless, high-impact web experiences by
            building modern, scalable, and lightning-fast MERN stack
            applications.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-10 flex flex-wrap gap-6"
          >
            <a
              href="#projects"
              className="px-6 py-3 rounded-full font-medium text-lg text-white
              bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302663]
              shadow-lg hover:scale-105 transition-all"
            >
              View My Work
            </a>

            <a
              href="/BalajiResume.docx"
              download
              className="px-6 py-3 rounded-full font-medium text-lg text-black
              bg-white hover:bg-gray-200 shadow-lg hover:scale-105 transition-all"
            >
              My Resume
            </a>
          </motion.div>

          {/* Socials */}
          <div className="mt-10 flex gap-5 text-2xl md:text-3xl">
            {socials.map(({ Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                variants={glowVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="text-gray-300"
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>

        {/* ================= RIGHT SECTION ================= */}
        <div className="relative hidden lg:flex items-center justify-end pointer-events-none">
          {/* Glow */}
          <div
            className="absolute right-24 top-1/2 -translate-y-1/2"
            style={{
              width: "min(22vw, 420px)",
              height: "min(22vw, 420px)",
              borderRadius: "50%",
              filter: "blur(40px)",
              opacity: 0.35,
              background:
                "conic-gradient(from 0deg, #1cd8d2, #00bf8f, #302663, #1cd8d2)",
            }}
          />

          {/* Avatar */}

          <motion.img
            src={avator}
            alt="Balaji Patil"
            className="relative object-contain max-h-[85vh]"
            style={{
              width: "clamp(320px, 40vw, 720px)",
              marginRight: "2.5rem",
            }}
            /* ONE-TIME ENTRY */
            initial={{ opacity: 0, y: 50, scale: 0.96 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: [1, 1.09, 1], // only scale animates continuously
            }}
            transition={{
              opacity: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
              y: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
              scale: {
                duration: 6,
                ease: "easeInOut",
                repeat: Infinity,
              },
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
