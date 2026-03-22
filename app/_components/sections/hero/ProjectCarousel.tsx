"use client";

import React, { useRef } from "react";
import Image from "next/image";
import mockup1 from "@/app/_assets/mockups/Anna Hendra.png";
import mockup2 from "@/app/_assets/mockups/Free Laptop Mockup.png";
import mockup3 from "@/app/_assets/mockups/Indra Okyanto - Macbook Mockup.png";
import mockup4 from "@/app/_assets/mockups/Mockup 1.png";
import mockup5 from "@/app/_assets/mockups/Mockup 3.png";
import mockup6 from "@/app/_assets/mockups/Mockup Ipad.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectCarousel() {
  const container = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!slider.current) return;

      const totalWidth = slider.current.scrollWidth / 3;

      const animation = gsap.to(slider.current, {
        x: `-=${totalWidth}`,
        duration: 30,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
        },
      });

      // Subtle skew for modern feel
      gsap.set(slider.current.children, { skewX: -3 });

      // Pause on hover
      const enterHandler = () =>
        gsap.to(animation, { timeScale: 0.1, duration: 1, ease: "power2.out" });
      const leaveHandler = () =>
        gsap.to(animation, { timeScale: 1, duration: 1, ease: "power2.inOut" });

      container.current?.addEventListener("mouseenter", enterHandler);
      container.current?.addEventListener("mouseleave", leaveHandler);

      // Entrance Reveal on Scroll
      gsap.from(slider.current.children, {
        scrollTrigger: {
          trigger: container.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
      });

      return () => {
        container.current?.removeEventListener("mouseenter", enterHandler);
        container.current?.removeEventListener("mouseleave", leaveHandler);
      };
    },
    { scope: container },
  );

  const projects = [mockup1, mockup2, mockup3, mockup4, mockup5, mockup6];

  return (
    <div
      ref={container}
      className="relative w-full overflow-hidden py-12 md:py-20"
    >
      <div ref={slider} className="flex gap-6 w-max">
        {[...projects, ...projects, ...projects].map((image, index) => (
          <div
            key={index}
            className="w-100 md:w-164 h-63.75 md:h-110 shrink-0 overflow-hidden rounded-3xl border border-white/5 shadow-2xl"
          >
            <Image
              src={image}
              alt={`Project ${index + 1}`}
              width={1200}
              height={800}
              className="h-full w-full object-cover hover:scale-[1.05] transition-transform duration-700 ease-out "
            />
          </div>
        ))}
      </div>

      {/* <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-background via-transparent to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-background via-transparent to-transparent z-10 pointer-events-none"></div> */}
    </div>
  );
}
