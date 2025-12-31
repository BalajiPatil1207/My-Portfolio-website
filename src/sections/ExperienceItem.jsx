import { motion, useTransform } from "framer-motion";

export default function ExperienceItem({
  exp,
  idx,
  start,
  end,
  scrollYProgress,
  layout,
}) {
  const scale = useTransform(scrollYProgress, [start, end], [0, 1]);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y = useTransform(scrollYProgress, [start, end], [30, 0]);
  const x = useTransform(scrollYProgress, [start, end], [-24, 0]);

  const isUp = idx % 2 === 0;

  /* ================= DESKTOP ================= */
  if (layout === "desktop") {
    return (
      <div className="relative flex flex-1 justify-center min-w-0">
        {/* DOT — PERFECTLY ON HORIZONTAL LINE */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 z-10
                     w-7 h-7 rounded-full bg-orange-500
                     shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
          style={{ scale, opacity }}
        />

        {/* CONNECTOR */}
        <motion.div
          className={`absolute ${
            isUp
              ? "top-1/2 -translate-y-full"
              : "top-1/2"
          } w-[3px] bg-white/40`}
          style={{ height: 40, opacity }}
        />

        {/* CARD */}
        <motion.article
          className={`absolute ${
            isUp
              ? "bottom-[calc(50%+48px)]"
              : "top-[calc(50%+48px)]"
          } bg-gray-900/80 backdrop-blur border
             border-gray-700/70 rounded-xl
             p-7 w-[320px] shadow-lg`}
          style={{ opacity, y, x }}
          transition={{ duration: 0.4, delay: idx * 0.15 }}
        >
          <h3 className="text-xl font-semibold text-white break-words">
            {exp.role}
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            {exp.company} | {exp.duration}
          </p>
          <p className="text-sm text-gray-300 mt-3 break-words">
            {exp.description}
          </p>
        </motion.article>
      </div>
    );
  }

  /* ================= MOBILE ================= */
  return (
    <motion.article
      className="bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-5 shadow-lg"
      style={{ opacity, x }}
      transition={{ duration: 0.4, delay: idx * 0.15 }}
    >
      <h3 className="text-lg font-semibold text-white">
        {exp.role}
      </h3>
      <p className="text-sm text-gray-400">
        {exp.company} | {exp.duration}
      </p>
      <p className="text-sm text-gray-300 mt-2">
        {exp.description}
      </p>
    </motion.article>
  );
}
