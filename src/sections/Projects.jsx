import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import img1 from "../assets/img1.png";
import img4 from "../assets/img4.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import photo1 from "../assets/photo1.png";
import photo2 from "../assets/photo2.png";
import photo4 from "../assets/photo4.jpeg";
import photo3 from "../assets/photo3.png";

/* ================= HOOK ================= */

const useIsMobile = (query = "(max-width: 639px)") => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return isMobile;
};

/* ================= COMPONENT ================= */

export default function Projects() {
  const isMobile = useIsMobile();
  const sceneRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const projects = useMemo(
    () => [
      {
        title: "Hash Programming",
        link: "https://hashprogramming.com/",
        bgColor: "#FFA500",
        image: isMobile ? photo4 : img4,
      },
      {
        title: "Booklane",
        link: "https://booklane-website-clone.vercel.app/",
        bgColor: "#0d4d3d",
        image: isMobile ? img1 : photo1,
      },
      {
        title: "Discord",
        link: "https://discord-clone-website-sable.vercel.app/",
        bgColor: "#5865F2",
        image: isMobile ? img2 : photo2,
      },
      {
        title: "Razorpay",
        link: "https://razor-pay-clone-website-jlcd.vercel.app/",
        bgColor: "#3884d3",
        image: isMobile ? img3 : photo3,
      },
    ],
    [isMobile]
  );

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const thresholds = projects.map((_, i) => (i + 1) / projects.length);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = thresholds.findIndex((t) => v < t);
    setActiveIndex(idx === -1 ? thresholds.length - 1 : idx);
  });

  const activeProject = projects[activeIndex];

  return (
    <section
      ref={sceneRef}
      id="projects"
      className="relative text-white transition-colors duration-500"
      style={{
        height: `${projects.length * 100}vh`,
        backgroundColor: activeProject.bgColor,
      }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        {/* Heading */}
        <motion.h2
          className="text-3xl sm:text-4xl font-semibold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          My Work
        </motion.h2>

        {/* Project Card */}
        <motion.div
          key={activeProject.title}
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-[88%] max-w-[1200px] will-change-transform mt-5"
        >
          {/* Title */}
          <h3
            className={`absolute z-20 italic font-semibold
bg-gradient-to-b from-black to-white bg-clip-text text-transparent
text-[clamp(2rem,6vw,4.5rem)]
            ${isMobile ? "-top-8 w-full text-center" : "-top-16 left-0"}`}
          >
            {activeProject.title}
          </h3>

          {/* Image Wrapper */}
          <div
            className={`relative overflow-hidden
              ${isMobile ? "rounded-lg" : "rounded-xl"}
              h-[62vh] sm:h-[68vh]
              bg-black/30
              shadow-[0_30px_60px_-20px_rgba(0,0,0,0.75)]
            `}
          >
            <motion.img
              src={activeProject.image}
              alt={activeProject.title}
              loading="lazy"
              className="w-full h-full object-cover"
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />

            {/* Soft gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.a
          href={activeProject.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`absolute ${isMobile ? "bottom-15" : "bottom-12"}
          px-7 py-3 rounded-lg font-semibold -mb-8
          bg-white text-black border-none
          hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]
          transition-all`}
          whileTap={{ scale: 0.95 }}
        >
          View Project
        </motion.a>
      </div>
    </section>
  );
}
