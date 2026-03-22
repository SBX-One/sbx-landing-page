"use client";

import React, { useRef } from "react";
import SectionTitle from "../../SectionTitle";
import { useTranslations } from "next-intl";
import SocialProof from "../../ui/SocialProof";
import particle1 from "@/app/_assets/testimonial/Frame 1984079768.svg";
import particle2 from "@/app/_assets/testimonial/Frame 1984079769.svg";
import particle3 from "@/app/_assets/testimonial/Frame 1984079770.svg";
import particle4 from "@/app/_assets/testimonial/Frame 1984079771.svg";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Desktop: scattered positions with random Y offsets + slight rotation for each card
const desktopScatterStyles: React.CSSProperties[] = [
  { transform: "translateY(-30px) translatex(30px) rotate(-1.5deg)" },
  { transform: "translateY(200px) translatex(-80px) rotate(1.2deg)" },
  { transform: "translateY(-40px) rotate(-0.6deg)" },
  { transform: "translateY(200px) rotate(0.8deg)" },
];

const testimonials = [
  {
    name: "Marcus T.",
    role: "Managing Director",
    text: "Our legacy platform was a massive bottleneck for years. SBX didn't just give it a new skin they re-engineered the entire core. The speed improvement was instantaneous, and for the first time, our digital infrastructure actually supports our growth instead of hindering it.",
    stars: 5,
  },
  {
    name: "Sarah Jenkins",
    role: "Operations Lead",
    text: "Working with SBX and team was refreshing. No sugarcoating, just pure execution. They were brutally honest about what wouldn't work in our initial plan, and their alternative solution ended up saving us months of development time. Elite professionalism at its finest.",
    stars: 5,
  },
  {
    name: "Andre Wijaya",
    role: "Property Owner",
    text: "Managing multiple properties used to be a nightmare of manual spreadsheets and late-night emails. SBX built us a custom management dashboard that automated 80% of our workflow. It’s clean, it’s fast, and it’s become the backbone of our daily operations.",
    stars: 5,
  },
  {
    name: "Elena R.",
    role: "Marketing Head",
    text: "The White Sharks team has an incredible eye for detail. They took our vague concept and transformed it into a world-class UI/UX experience that our users love. Our engagement metrics have skyrocketed since the launch, proving that good design is a serious business investment.",
    stars: 5,
  },
  {
    name: "David Chen",
    role: "Tech Founder",
    text: "TAs a founder, I’ve dealt with many agencies that overpromise and underdeliver. SBX is the complete opposite. Their technical depth with React and Laravel is impressive, and the scalability of the code they delivered gives me total confidence for our future expansions.",
    stars: 5,
  },
  {
    name: "Siska Putri",
    role: "General Manager",
    text: "We were losing a significant number of leads because our old booking process was too clunky. SBX redesigned the entire journey, making it seamless and intuitive. The result? A 40% increase in direct bookings within the first month of going live.",
    stars: 5,
  },
  {
    name: "Robert H.",
    role: "Project Coordinator",
    text: "What sets SBX apart is their systematic approach. They don't just start coding; they audit, they architect, and then they execute with precision. It felt less like hiring a vendor and more like adding an elite technical unit to our own internal team.",
    stars: 5,
  },
  {
    name: "Julian M.",
    role: "Creative Director",
    text: "We needed a digital presence that reflected the premium nature of our services. Most agencies gave us generic templates, but SBX delivered a bespoke, high-end experience that immediately commands authority. Our online presence finally matches our offline reputation.",
    stars: 5,
  },
  {
    name: "Kevin C.",
    role: "Business Development Lead",
    text: "Our project required complex backend logic and real-time data synchronization. The Tiger Sharks Team handled the engineering with zero friction. The system is robust, secure, and performs flawlessly under high load exactly what we needed for our expansion.",
    stars: 5,
  },
  {
    name: "Amanda L.",
    role: "Startup Founder",
    text: "If you’re looking for someone to just 'build a website,' look elsewhere. But if you need an engineering partner to build a scalable digital powerhouse that drives actual business results, SBX is the only team you should be talking to.",
    stars: 5,
  },
];

export default function Testimonials() {
  const t = useTranslations("Testimonials");
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const topRowContainerRef = useRef<HTMLDivElement>(null);
  const topRowSliderRef = useRef<HTMLDivElement>(null);
  const bottomRowContainerRef = useRef<HTMLDivElement>(null);
  const bottomRowSliderRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !headingRef.current) return;

      const headingElement = headingRef.current;

      // Recursive text split for character animation
      const recursiveSplit = (node: Node) => {
        if (node.nodeType === 3) {
          const text = node.textContent || "";
          const fragment = document.createDocumentFragment();
          text.split("").forEach((char) => {
            const outer = document.createElement("span");
            outer.className = "inline-block overflow-hidden align-top";
            const inner = document.createElement("span");
            inner.className =
              "testimonial-heading-char inline-block translate-y-[110%]";
            inner.innerHTML = char === " " ? "&nbsp;" : char;
            outer.appendChild(inner);
            fragment.appendChild(outer);
          });
          node.parentNode?.replaceChild(fragment, node);
        } else if (node.nodeType === 1) {
          Array.from(node.childNodes).forEach(recursiveSplit);
        }
      };

      recursiveSplit(headingElement);

      // --- Entrance Timeline ---
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 20%",
          toggleActions: "play none none none",
        },
      });

      // Heading animation (character by character)
      const chars = gsap.utils.toArray(".testimonial-heading-char");
      timeline.to(chars, {
        y: 0,
        duration: 0.8,
        stagger: 0.01,
        ease: "power3.out",
      });

      // Individual Card Animation (Triggers when each card enters the viewport)
      const cards = gsap.utils.toArray<HTMLElement>(
        ".testimonial-card-wrapper",
      );
      cards.forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 95%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          scale: 0.9,
          y: 50,
          filter: "blur(10px)",
          duration: 1.5,
          ease: "expo.out",
        });
      });

      // Particle entrance
      gsap.set(".testimonial-particle", { opacity: 0, scale: 0.5 });
      gsap.to(".testimonial-particle", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
          toggleActions: "play none none none",
        },
        opacity: 1,
        scale: 1,
        duration: 2,
        stagger: 0.2,
        ease: "power3.out",
      });

      // Steady floating particles
      gsap.to(".testimonial-particle", {
        y: "+=25",
        x: "+=15",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 0.5,
          from: "random",
        },
      });

      // --- Mobile Marquee Rows (GSAP, like hero carousel) ---
      // Top row: scrolls LEFT
      if (topRowSliderRef.current) {
        const topTotalWidth = topRowSliderRef.current.scrollWidth / 3;
        const topAnim = gsap.to(topRowSliderRef.current, {
          x: `-=${topTotalWidth}`,
          duration: 30,
          ease: "none",
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize((x) => parseFloat(x) % topTotalWidth),
          },
        });

        // Entrance reveal
        gsap.from(topRowSliderRef.current.children, {
          scrollTrigger: {
            trigger: topRowContainerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 40,
          opacity: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out",
        });

        // Hover to slow
        const topEnter = () =>
          gsap.to(topAnim, { timeScale: 0.1, duration: 1, ease: "power2.out" });
        const topLeave = () =>
          gsap.to(topAnim, { timeScale: 1, duration: 1, ease: "power2.inOut" });
        topRowContainerRef.current?.addEventListener("mouseenter", topEnter);
        topRowContainerRef.current?.addEventListener("mouseleave", topLeave);
      }

      // Bottom row: scrolls RIGHT
      if (bottomRowSliderRef.current) {
        const bottomTotalWidth = bottomRowSliderRef.current.scrollWidth / 3;
        // Start offset so it scrolls in the opposite direction
        gsap.set(bottomRowSliderRef.current, { x: -bottomTotalWidth });
        const bottomAnim = gsap.to(bottomRowSliderRef.current, {
          x: `+=${bottomTotalWidth}`,
          duration: 30,
          ease: "none",
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize(
              (x) => -bottomTotalWidth + (parseFloat(x) % bottomTotalWidth),
            ),
          },
        });

        // Entrance reveal
        gsap.from(bottomRowSliderRef.current.children, {
          scrollTrigger: {
            trigger: bottomRowContainerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 40,
          opacity: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out",
        });

        // Hover to slow
        const bottomEnter = () =>
          gsap.to(bottomAnim, {
            timeScale: 0.1,
            duration: 1,
            ease: "power2.out",
          });
        const bottomLeave = () =>
          gsap.to(bottomAnim, {
            timeScale: 1,
            duration: 1,
            ease: "power2.inOut",
          });
        bottomRowContainerRef.current?.addEventListener(
          "mouseenter",
          bottomEnter,
        );
        bottomRowContainerRef.current?.addEventListener(
          "mouseleave",
          bottomLeave,
        );
      }

      // Mouse Parallax (Desktop)
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 60;
        const yPos = (clientY / window.innerHeight - 0.5) * 60;

        gsap.to(".testimonial-particle-1", {
          x: xPos * 0.3,
          y: yPos * 0.3,
          duration: 1.5,
        });
        gsap.to(".testimonial-particle-2", {
          x: -xPos * 0.4,
          y: -yPos * 0.4,
          duration: 2,
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="testimonials"
      className="relative overflow-clip"
    >
      <div className="projects-sticky-header lg:sticky top-0  lg:h-screen lg:flex lg:flex-col lg:justify-center z-10 w-full">
        <Image
          src={particle1}
          alt=""
          className="testimonial-particle testimonial-particle-1 w-25 md:w-50 absolute top-30 md:top-12 right-0 md:right-auto md:left-0 object-cover -z-50"
        />
        <Image
          src={particle2}
          alt=""
          className="testimonial-particle testimonial-particle-2 w-25 md:w-50 absolute bottom-0 md:bottom-12 right-0 object-cover -z-50"
        />
        <Image
          src={particle3}
          alt=""
          className="testimonial-particle testimonial-particle-1 w-25 md:w-50 absolute bottom-0 md:bottom-60 right-0 object-cover -z-50"
        />
        <Image
          src={particle4}
          alt=""
          className="testimonial-particle testimonial-particle-2 w-21 md:w-50 absolute bottom-0 md:bottom-8 left-0 object-cover -z-50"
        />
        <div className="flex flex-col justify-center lg:items-center gap-8 px-4 md:px-8 lg:px-14 py-12 md:py-25">
          <SectionTitle title={t("title")} />
          <h1
            ref={headingRef}
            className="lg:text-center text-heading-5 md:text-display lg:w-[60%] whitespace-pre-line font-medium leading-tight md:leading-tight"
          >
            {t("heading")}
          </h1>
        </div>
      </div>

      {/* Desktop: Scattered / Random layout */}
      <div className="hidden lg:grid grid-cols-2 gap-x-80 px-4 md:px-8 lg:px-14 mb-16 relative z-10 min-h-[500vh]">
        {testimonials.map((item, idx) => (
          <div
            key={idx}
            className="testimonial-card-wrapper"
            style={desktopScatterStyles[idx % desktopScatterStyles.length]}
          >
            <SocialProof
              name={item.name}
              role={item.role}
              text={item.text}
              stars={item.stars}
            />
          </div>
        ))}
      </div>

      {/* Mobile / Tablet: 2 rows — top scrolls left, bottom scrolls right */}
      <div className="lg:hidden relative z-10 mb-16 flex flex-col gap-4">
        {/* Top row — scrolls to the left */}
        <div ref={topRowContainerRef} className="overflow-hidden">
          <div ref={topRowSliderRef} className="flex gap-4 w-max">
            {[
              ...testimonials.slice(0, 5),
              ...testimonials.slice(0, 5),
              ...testimonials.slice(0, 5),
            ].map((item, idx) => (
              <div key={`top-${idx}`} className="shrink-0 w-75 md:w-90">
                <SocialProof
                  name={item.name}
                  role={item.role}
                  text={item.text}
                  stars={item.stars}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Bottom row — scrolls to the right */}
        <div ref={bottomRowContainerRef} className="overflow-hidden">
          <div ref={bottomRowSliderRef} className="flex gap-4 w-max">
            {[
              ...testimonials.slice(5, 10),
              ...testimonials.slice(5, 10),
              ...testimonials.slice(5, 10),
            ].map((item, idx) => (
              <div key={`bottom-${idx}`} className="shrink-0 w-75 md:w-90">
                <SocialProof
                  name={item.name}
                  role={item.role}
                  text={item.text}
                  stars={item.stars}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
