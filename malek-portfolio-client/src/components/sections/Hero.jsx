import { motion } from "framer-motion";
import Button from "../ui/Button";
import GridGlowBackground from "../ui/GridGlowBackground";
import useFetch from "../../hooks/useFetch";
import { getProfile } from "../../api/profile";

export default function Hero() {
  const { data: profile } = useFetch(getProfile, []);

  const scrollTo = (href) => (e) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      <GridGlowBackground />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <p className="mb-3 font-heading text-lg text-secondary">Hi, I'm</p>
        <h1 className="font-heading text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl">
          {profile?.name ?? "Malek Jaber"}
        </h1>
        <p className="mt-4 bg-gradient-to-r from-accent via-accent-soft to-accent bg-[length:200%_auto] bg-clip-text font-heading text-2xl font-medium text-transparent animate-gradient-slow sm:text-3xl">
          {profile?.title ?? "Full Stack Web Developer"}
        </p>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-secondary">
          {profile?.bio ??
            "I build scalable web applications with modern technologies, transforming ideas into fast, elegant, and production-ready digital experiences."}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button as="a" href="#projects" variant="primary" onClick={scrollTo("#projects")}>
            View Projects
          </Button>
          <Button as="a" href="#contact" variant="outline" onClick={scrollTo("#contact")}>
            Contact Me
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
