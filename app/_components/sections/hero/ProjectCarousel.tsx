"use client";

import React, { useRef } from "react";
import Image from "next/image";
import mockup1 from "@/app/_assets/mockups/Anna Hendra.webp";
import mockup2 from "@/app/_assets/mockups/Free Laptop Mockup.webp";
import mockup3 from "@/app/_assets/mockups/Indra Okyanto - Macbook Mockup.webp";
import mockup4 from "@/app/_assets/mockups/Mockup 1.webp";
import mockup5 from "@/app/_assets/mockups/Mockup 3.webp";
import mockup6 from "@/app/_assets/mockups/Mockup Ipad.webp";
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

      // Gunakan 3 set secara konsisten untuk stabilitas dan infinite effect
      const totalWidth = slider.current.scrollWidth / 3;

      const animation = gsap.to(slider.current, {
        x: `-=${totalWidth}`,
        duration: 35,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
        },
      });

      // Pause animation when off-screen to save resources
      ScrollTrigger.create({
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) =>
          self.isActive ? animation.play() : animation.pause(),
      });

      // Subtle skew for modern feel during motion
      gsap.set(slider.current.children, { skewX: -3 });

      // Entrance Reveal on Scroll
      gsap.from(slider.current.children, {
        scrollTrigger: {
          trigger: container.current,
          start: "top 95%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.05,
        ease: "power3.out",
      });

      return () => animation.kill();
    },
    { scope: container },
  );

  const onEnter = () => {
    const anim = gsap.getTweensOf(slider.current)[0];
    if (anim)
      gsap.to(anim, { timeScale: 0.1, duration: 1, ease: "power2.out" });
  };

  const onLeave = () => {
    const anim = gsap.getTweensOf(slider.current)[0];
    if (anim)
      gsap.to(anim, { timeScale: 1, duration: 1, ease: "power2.inOut" });
  };

  const projects = [mockup1, mockup2, mockup3, mockup4, mockup5, mockup6];

  return (
    <div
      ref={container}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="relative w-full overflow-hidden py-12 md:py-20"
    >
      <div ref={slider} className="flex gap-6 w-max">
        {[...projects, ...projects, ...projects].map((image, index) => (
          <div
            key={index}
            className="w-80 md:w-164 h-50 md:h-110 shrink-0 overflow-hidden rounded-3xl border border-white/5 shadow-2xl"
          >
            <Image
              src={image}
              alt={`Project ${index + 1}`}
              width={800}
              height={500}
              sizes="(max-width: 768px) 320px, 800px"
              className="h-full w-full object-cover hover:scale-[1.05] transition-transform duration-700 ease-out "
              priority={index < 3}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
