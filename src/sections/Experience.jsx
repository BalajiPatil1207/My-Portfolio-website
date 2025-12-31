import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ExperienceItem from "./ExperienceItem";

const experiences = [
  {
    role: "Junior Software Developer (Intern)",
    company: "CloudRegex Infotech",
    // duration: "1 Sept 2025 – 31 Dec 2025",
    description:
      "Started internship by learning project structure, basics of web development, and assisting in simple tasks.",
  },
  {
    role: "MERN Stack Developer",
    company: "CloudRegex Infotech",
    // duration: "1 Jan 2026 – 30 Apr 2026",
    description:
      "Worked on MERN stack features including React UI, API integration, and database operations.",
  },
  {
    role: "Frontend & Backend Support",
    company: "CloudRegex Infotech",
    // duration: "1 May 2026 – 31 July 2026",
    description:
      "Handled UI improvements, bug fixing, backend support, and improving performance.",
  },
];

export default function Experience() {
  const sceneRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  /* Detect mobile */
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /* Scroll */
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  /* Scene height */
  const SCENE_HEIGHT_VH =
    (isMobile ? 160 : 120) * experiences.length;

  /* Thresholds */
  const thresholds = useMemo(
    () => experiences.map((_, i) => (i + 1) / experiences.length),
    []
  );

  /* Progress line */
  const lineSize = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  return (
    <section id="experience" className="relative bg-black text-white py-24">
      <div
        ref={sceneRef}
        style={{ height: `${SCENE_HEIGHT_VH}vh`, minHeight: "120vh" }}
        className="relative"
      >
        <div className="sticky top-0 h-screen flex flex-col">
          <h2 className="text-4xl sm:text-5xl font-semibold mt-6 text-center">
            Experience
          </h2>

          <div className="flex flex-1 items-center justify-center px-6 pb-10">
            {/* ================= DESKTOP ================= */}
            {!isMobile && (
              <div className="relative w-full max-w-7xl h-full">
                {/* Horizontal line */}
                <div className="absolute top-1/2 left-0 w-full h-[6px] bg-white/15 rounded">
                  <motion.div
                    className="absolute left-0 top-0 h-[6px] bg-white rounded origin-left"
                    style={{ width: lineSize }}
                  />
                </div>

                {/* Cards */}
                <div className="relative flex justify-between h-full">
                  {experiences.map((exp, idx) => (
                    <ExperienceItem
                      key={idx}
                      exp={exp}
                      idx={idx}
                      start={idx === 0 ? 0 : thresholds[idx - 1]}
                      end={thresholds[idx]}
                      scrollYProgress={scrollYProgress}
                      layout="desktop"
                    />
                  ))}
                </div> 
              </div>
            )}

            {/* ================= MOBILE ================= */}
            {isMobile && (
              <div className="relative w-full max-w-md">
                <div className="absolute left-4 top-0 bottom-0 w-[6px] bg-white/15 rounded">
                  <motion.div
                    className="absolute top-0 left-0 w-[6px] bg-white rounded origin-top"
                    style={{ height: lineSize }}
                  />
                </div>

                <div className="relative flex flex-col gap-10 ml-10 mt-6 pb-28">
                  {experiences.map((exp, idx) => (
                    <ExperienceItem
                      key={idx}
                      exp={exp}
                      idx={idx}
                      start={idx === 0 ? 0 : thresholds[idx - 1]}
                      end={thresholds[idx]}
                      scrollYProgress={scrollYProgress}
                      layout="mobile"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
