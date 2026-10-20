import { About } from "@/components/sections/About";
import { Background } from "@/components/sections/Background";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { TechStack } from "@/components/sections/TechStack";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <About />
      <TechStack />
      <Projects />
      <Experience />
      <Background />
      <Contact />
    </>
  );
}
