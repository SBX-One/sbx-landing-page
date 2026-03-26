import dynamic from "next/dynamic";
import Hero from "../_components/sections/hero/Hero";

const Stats = dynamic(() => import("../_components/sections/stats/Stats"));
const About = dynamic(() => import("../_components/sections/about/About"));
const Why = dynamic(() => import("../_components/sections/why/Why"));
const Expertise = dynamic(() => import("../_components/sections/expertise/Expertise"));
const Projects = dynamic(() => import("../_components/sections/projects/Projects"));
const Pricing = dynamic(() => import("../_components/sections/pricing/Pricing"));
const HowItWorks = dynamic(() => import("../_components/sections/how/HowItWorks"));
const Faq = dynamic(() => import("../_components/sections/faq/Faq"));
const Testimonials = dynamic(() => import("../_components/sections/Testimonials/Testimonials"));

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
      <HowItWorks />
      <Faq />
      <Testimonials />
    </>
  );
}
