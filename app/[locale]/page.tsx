import About from "../_components/sections/about/About";
import Hero from "../_components/sections/hero/Hero";
import Stats from "../_components/sections/stats/Stats";
import Why from "../_components/sections/why/Why";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <Why />
    </>
  );
}
