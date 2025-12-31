import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";

/* ---------------- SOCIAL LINKS ---------------- */
const socials = [
  {
    Icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/BalajiPatil1207",
  },
  {
    Icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/balaji-patil-73b288320/",
  },
  {
    Icon: FaEnvelope,
    label: "Email",
    href: "mailto:patilbalaji2004@gmail.com",
  },
];

/* ---------------- GLOW ANIMATION ---------------- */
const glowVariants = {
  initial: {
    scale: 1,
    y: 0,
    filter: "drop-shadow(0 0 0 rgba(0,0,0,0))",
  },
  hover: {
    scale: 1.2,
    y: -4,
    filter:
      "drop-shadow(0 0 8px rgba(13,88,204,0.9)) drop-shadow(0 0 18px rgba(16,185,129,0.8))",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },
  tap: {
    scale: 0.95,
    y: 0,
    transition: { duration: 0.08 },
  },
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black">
      {/* BACKGROUND GLOWS */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_70%_35%,rgba(13,88,204,0.35),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_55%_at_30%_70%,rgba(16,185,129,0.30),transparent_70%)]" />

      <motion.div
        className="relative z-10 px-4 sm:px-8 lg:px-10 py-16 md:py-20 flex flex-col items-center text-center space-y-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* NAME */}
        <h1
          className="font-semibold leading-none text-white select-none"
          style={{
            fontSize: "clamp(3rem, 5vw, 14rem)",
            letterSpacing: "0.02em",
            lineHeight: 0.9,
            padding: "0 3vw",
            whiteSpace: "nowrap",
            textShadow: "0 2px 18px rgba(0,0,0,0.45)",
          }}
        >
          Balaji Patil
        </h1>

        {/* DIVIDER */}
        <div className="h-[3px] w-24 md:w-32 rounded-full bg-gradient-to-r from-[#0d58cc] via-cyan-300 to-emerald-400" />

        {/* SOCIAL ICONS */}
        <div className="flex gap-5 text-2xl md:text-3xl">
          {socials.map(({ Icon, label, href }) => (
            <motion.a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              variants={glowVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="text-gray-300 hover:text-white transition-colors duration-200 inline-flex items-center justify-center"
            >
              <Icon />
            </motion.a>
          ))}
        </div>

        {/* QUOTE */}
        <p className="text-gray-300 italic max-w-xl">
          “Success is when preparation meets opportunity.”
        </p>

        {/* COPYRIGHT */}
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Balaji Patil. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
}
