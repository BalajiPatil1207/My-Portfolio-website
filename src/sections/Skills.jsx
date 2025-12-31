import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaReact } from "react-icons/fa";
import {
  SiTailwindcss,
  SiFastapi,
  SiMongodb,
  SiJavascript,
  SiExpress,
  SiGit,
  SiGithub,
  SiCanva,
  SiOpenai,
  SiGoogle,
  SiVercel,
} from "react-icons/si";
import { DiNodejsSmall } from "react-icons/di";
import { FaCss3, FaFigma, FaHtml5 } from "react-icons/fa6";

/* ================= DATA ================= */

const skills = [
  { icon: <FaHtml5 />, name: "HTML5" },
  { icon: <FaCss3 />, name: "CSS3" },
  { icon: <SiTailwindcss />, name: "Tailwind CSS" },
  { icon: <SiJavascript />, name: "JavaScript" },
  { icon: <FaReact />, name: "React" },
  { icon: <DiNodejsSmall />, name: "Node.js" },
  { icon: <SiExpress />, name: "Express" },
  { icon: <SiMongodb />, name: "MongoDB" },
  { icon: <SiFastapi />, name: "FastAPI" },
  { icon: <SiGit />, name: "Git" },
  { icon: <SiGithub />, name: "GitHub" },
  { icon: <SiVercel />, name: "Vercel" },
  { icon: <FaFigma />, name: "Figma" },
  { icon: <SiOpenai />, name: "ChatGPT" },
  { icon: <SiGoogle />, name: "Gemini AI" },
  { icon: <SiCanva />, name: "Canva" },
];

// duplicate for seamless loop
const marquee = [...skills, ...skills];

/* ================= COMPONENT ================= */

export default function Skills() {
  const lastScroll = useRef(0);
  const [direction, setDirection] = useState("left"); // left | right

  // Detect scroll direction
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setDirection(current > lastScroll.current ? "left" : "right");
      lastScroll.current = current;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="skills"
      className="relative w-full py-24 bg-black text-white overflow-hidden"
    >
      {/* Gradient Blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-50 -left-80 w-[50vw] sm:w-[50vw] md:w-[40vw]
          h-[70vw] sm:h-[50vw] md:h-[40vw] max-w-[500px] max-h-[500px]
          rounded-full bg-gradient-to-r from-[#634c2b] via-[#bf8600] to-[#d8a61c]
          opacity-30 sm:opacity-20 md:opacity-10 blur-[120px] animate-pulse" />

        <div className="absolute -bottom-50 -right-50 w-[50vw] sm:w-[50vw] md:w-[40vw]
          h-[70vw] sm:h-[50vw] md:h-[40vw] max-w-[500px] max-h-[500px]
          rounded-full bg-gradient-to-r from-[#634c2b] via-[#bf8600] to-[#d8a61c]
          opacity-30 sm:opacity-20 md:opacity-10 blur-[120px] animate-pulse delay-500" />
      </div>
      {/* ===== HEADING ===== */}
      <div className="relative z-10 text-center mb-14">
        <motion.h2
          className="text-4xl sm:text-5xl font-bold
          bg-clip-text text-transparent
          bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302663]"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          My Skills
        </motion.h2>

        <motion.p
          className="mt-2 text-white/90 text-base sm:text-lg"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          viewport={{ once: true }}
        >
          Modern Applications | Modern Technologies
        </motion.p>
      </div>

      {/* ===== MARQUEE ===== */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-16 w-max px-10 items-center"
          animate={{
            x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
          }}
          transition={{
            repeat: Infinity,
            duration: 35,
            ease: "linear",
          }}
        >
          {marquee.map((skill, i) => (
            <div
              key={i}
              className="group flex flex-col items-center justify-center"
            >
              <div
                className="text-4xl mb-2 text-[#00bf8f]
                drop-shadow-[0_0_10px_rgba(0,191,143,0.6)]
                transition-all duration-300
                group-hover:scale-125
                group-hover:drop-shadow-[0_0_22px_rgba(0,191,143,1)]"
              >
                {skill.icon}
              </div>
              <span className="text-sm text-gray-300 opacity-80 whitespace-nowrap">
                {skill.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
