import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroAnimation({ onFinish }) {
  const roles = useMemo(
    () => [
      "Hi 👋",
      "I’m Balaji Patil",
      "MERN Stack Developer"
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (index < roles.length - 1) {
      const t = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 600); // slightly faster text change
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setVisible(false);
      }, 900); // 🔥 faster ending
      return () => clearTimeout(t);
    }
  }, [index, roles.length]);

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}   
          transition={{ duration: 0.6, ease: "easeOut" }}  
        >
          <motion.h1
            key={roles[index]}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-center text-4xl sm:text-5xl md:text-6xl font-extrabold
            text-transparent bg-clip-text bg-gradient-to-r
            from-[#1cd8d2] via-[#00bf8f] to-[#302b63]
            tracking-wide"
          >
            {roles[index]}
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
