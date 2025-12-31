import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useEffect, useState } from "react";

const OverlayMenu = ({ isOpen, onClose }) => {
  const [origin, setOrigin] = useState("50% 8%");

  useEffect(() => {
    const updateOrigin = () => {
      setOrigin(window.innerWidth < 1024 ? "95% 8%" : "50% 8%");
    };

    updateOrigin();
    window.addEventListener("resize", updateOrigin);
    return () => window.removeEventListener("resize", updateOrigin);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md"
          style={{ backgroundColor: "rgba(0,0,0,0.95)" }}
          initial={{ clipPath: `circle(0% at ${origin})` }}
          animate={{ clipPath: `circle(140% at ${origin})` }}
          exit={{ clipPath: `circle(0% at ${origin})` }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white text-3xl hover:rotate-90 transition-transform"
            aria-label="Close Menu"
          >
            <FiX />
          </button>

          {/* Menu */}
          <ul className="space-y-6 text-center">
            {[
              "Home",
              "About",
              "Skills",
              "Projects",
              "Experience",
              "Testimonials",
              "Contact",
            ].map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.25 + index * 0.08 }}
              >
                <a
                  href={`#${item.toLowerCase()}`}
                  onClick={onClose}
                  className="text-4xl font-semibold text-white hover:text-pink-500 transition-colors duration-300"
                >
                  {item}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OverlayMenu;
