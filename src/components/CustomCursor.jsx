import { useEffect, useRef } from "react";

const DOT_COUNT = 14;

const CustomCursor = () => {
  const dotsRef = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const positions = useRef(
    Array.from({ length: DOT_COUNT }, () => ({ x: 0, y: 0 }))
  );

  useEffect(() => {
    const move = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", move);

    let animationId;
    const animate = () => {
      let x = mouse.current.x;
      let y = mouse.current.y;

      positions.current.forEach((pos, i) => {
        pos.x += (x - pos.x) * 0.3;
        pos.y += (y - pos.y) * 0.3;

        const dot = dotsRef.current[i];
        if (dot) {
          dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
        }

        x = pos.x;
        y = pos.y;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <>
      {Array.from({ length: DOT_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (dotsRef.current[i] = el)}
          className="pointer-events-none fixed top-0 left-0 rounded-full"
          style={{
            width: `${6 - i * 0.3}px`,
            height: `${6 - i * 0.3}px`,
            background: `rgba(34,211,238,${1 - i * 0.06})`,
            boxShadow: "0 0 6px rgba(34,211,238,0.6)",
            zIndex: 9999,
            willChange: "transform",
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;
