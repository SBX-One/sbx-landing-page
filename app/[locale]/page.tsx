import dynamic from "next/dynamic";
import Hero from "../_components/sections/hero/Hero";

const Stats = dynamic(() => import("../_components/sections/stats/Stats"), {
  loading: () => <div className="h-60" />,
});
const About = dynamic(() => import("../_components/sections/about/About"), {
  loading: () => <div className="h-125" />,
});
const Why = dynamic(() => import("../_components/sections/why/Why"), {
  loading: () => <div className="h-150" />,
});
const Expertise = dynamic(
  () => import("../_components/sections/expertise/Expertise"),
  {
    loading: () => <div className="h-200" />,
  },
);
const Projects = dynamic(
  () => import("../_components/sections/projects/Projects"),
  {
    loading: () => <div className="h-[200vh]" />,
  },
);
const Pricing = dynamic(
  () => import("../_components/sections/pricing/Pricing"),
  {
    loading: () => <div className="h-175" />,
  },
);
const HowItWorks = dynamic(
  () => import("../_components/sections/how/HowItWorks"),
  {
    loading: () => <div className="h-150" />,
  },
);
const Faq = dynamic(() => import("../_components/sections/faq/Faq"), {
  loading: () => <div className="h-125" />,
});
const Testimonials = dynamic(
  () => import("../_components/sections/Testimonials/Testimonials"),
  {
    loading: () => <div className="h-125" />,
  },
);

// Caching strategy: Revalidate every 1 hour (ISR)
export const revalidate = 3600;

// Tell Next.js which locales to pre-render statically for faster load times
export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "id" }];
}

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
