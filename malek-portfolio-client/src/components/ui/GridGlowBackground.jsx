import { useEffect, useRef } from "react";

export default function GridGlowBackground() {
  const parallaxRef = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      if (!parallaxRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      parallaxRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div ref={parallaxRef} className="absolute inset-0 transition-transform duration-300 ease-out">
        <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-accent/20 blur-[120px]" />
        <div className="absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-accent/15 blur-[120px]" />
      </div>
    </div>
  );
}
