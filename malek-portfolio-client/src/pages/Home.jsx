import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CursorGlow from "../components/ui/CursorGlow";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import TechStack from "../components/sections/TechStack";
import Projects from "../components/sections/Projects";
import Services from "../components/sections/Services";
import Contact from "../components/sections/Contact";

export default function Home() {
  return (
    <>
      <CursorGlow />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <TechStack />
        <Projects />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
