import About from "../_components/sections/about/About";
import Expertise from "../_components/sections/expertise/Expertise";
import Hero from "../_components/sections/hero/Hero";
import Pricing from "../_components/sections/pricing/Pricing";
import Projects from "../_components/sections/projects/Projects";
import Stats from "../_components/sections/stats/Stats";
import Why from "../_components/sections/why/Why";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <Why />
      <Expertise />
      <Projects />
      <Pricing />
    </>
  );
}
