"use client";

import React, { useRef } from "react";
import SectionTitle from "../../SectionTitle";
import { useTranslations } from "next-intl";
import ProjectCard from "../../ui/ProjectCard";
import project1 from "@/app/_assets/mockups/Anna Hendra.webp";
import project6 from "@/app/_assets/mockups/Free Laptop Mockup.webp";
import project3 from "@/app/_assets/mockups/Indra Okyanto - Macbook Mockup.webp";
import project5 from "@/app/_assets/mockups/Mockup 1.webp";
import project4 from "@/app/_assets/mockups/Mockup 3.webp";
import project2 from "@/app/_assets/mockups/Mockup Ipad.webp";
import particleElipse1 from "@/app/_assets/projects/Ellipse 15.svg";
import particleElipse2 from "@/app/_assets/projects/Ellipse 16.svg";
import particle1 from "@/app/_assets/projects/Frame 1984079743.svg";
import particle2 from "@/app/_assets/projects/Frame 1984079744.svg";
import particle3 from "@/app/_assets/projects/Frame 1984079745.svg";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Projects() {
  const t = useTranslations("Projects");
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const isMobile = window.innerWidth < 1024;

      // --- Entrance Timeline ---
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });

      // Heading animation - Simple slide up
      timeline.from(".project-heading", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      // Consolodated Card Animation
      gsap.from(".project-card-wrapper", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 20%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        scale: 0.9,
        y: 50,
        filter: "blur(10px)",
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
      });

      // Particle entrance
      gsap.set(".projects-particle", { opacity: 0, scale: 0.5 });
      gsap.to(".projects-particle", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
          toggleActions: "play none none none",
        },
        opacity: (i, target: HTMLElement) => {
          if (target.classList.contains("ellipse-particle")) return 1;
          return 0.5;
        },
        scale: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: "power3.out",
      });

      // Steady floating particles - Only on Desktop
      let floatingAnim: gsap.core.Tween | null = null;
      if (!isMobile) {
        floatingAnim = gsap.to(".projects-particle", {
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

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) =>
            self.isActive ? floatingAnim?.play() : floatingAnim?.pause(),
        });
      }

      // Reveal Section Content From Black
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0.2 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      const xSet1 = gsap.quickSetter(".projects-particle-1", "x", "px");
      const ySet1 = gsap.quickSetter(".projects-particle-1", "y", "px");
      const xSet2 = gsap.quickSetter(".projects-particle-2", "x", "px");
      const ySet2 = gsap.quickSetter(".projects-particle-2", "y", "px");
      const xSetE1 = gsap.quickSetter(".ellipse-particle-1", "x", "px");
      const ySetE1 = gsap.quickSetter(".ellipse-particle-1", "y", "px");
      const xSetE2 = gsap.quickSetter(".ellipse-particle-2", "x", "px");
      const ySetE2 = gsap.quickSetter(".ellipse-particle-2", "y", "px");

      let mouseX = 0,
        mouseY = 0;
      const onMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 60;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 60;
      };

      const tickerUpdate = () => {
        xSet1(mouseX * 0.4);
        ySet1(mouseY * 0.4);
        xSet2(-mouseX * 0.6);
        ySet2(-mouseY * 0.6);
        xSetE1(mouseX * 0.2);
        ySetE1(mouseY * 0.2);
        xSetE2(-mouseX * 0.3);
        ySetE2(-mouseY * 0.3);
      };

      if (!isMobile) {
        window.addEventListener("mousemove", onMouseMove);
        gsap.ticker.add(tickerUpdate);
      }

      return () => {
        if (!isMobile) {
          window.removeEventListener("mousemove", onMouseMove);
          gsap.ticker.remove(tickerUpdate);
        }
        floatingAnim?.kill();
      };
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative overflow-clip"
    >
      {/* Sticky Header Wrapper (Desktop) */}
      <div
        ref={overlayRef}
        className="absolute hidden lg:block inset-0 bg-background z-20 pointer-events-none"
      ></div>
      <div className="projects-sticky-header lg:sticky top-0 lg:h-screen lg:flex lg:flex-col lg:justify-center z-10 w-full">
        {/* Background Particles inside pinned container so they pin with the header */}
        <Image
          src={particleElipse1}
          alt=""
          width={1200}
          height={800}
          className="projects-particle ellipse-particle ellipse-particle-1 absolute -top-50 md:-top-60 -right-40 md:-right-80 size-127.75 md:size-200 object-cover -z-1"
        />
        <Image
          src={particleElipse2}
          alt=""
          width={1200}
          height={800}
          className="projects-particle ellipse-particle ellipse-particle-2 absolute md:-bottom-60 -left-40 md:-left-80 size-127.75 md:size-200 object-cover -z-1"
        />
        <Image
          src={particle1}
          alt=""
          width={1200}
          height={800}
          className="projects-particle projects-particle-1 absolute top-30 left-25 size-50 object-cover -z-1 hidden md:block"
        />
        <Image
          src={particle2}
          alt=""
          width={1200}
          height={800}
          className="projects-particle projects-particle-2 absolute bottom-20 right-25 size-50 object-cover -z-1 hidden md:block"
        />
        <Image
          src={particle3}
          alt=""
          width={1200}
          height={800}
          className="projects-particle projects-particle-3 absolute top-65 left-0 size-24 object-cover -z-1 lg:hidden"
        />

        <div className="flex flex-col justify-center items-center gap-6 mb-16 px-4 md:px-8 lg:px-14 py-12 md:py-25">
          <SectionTitle title={t("title")} />
          <h2
            ref={headingRef}
            className="project-heading text-center text-heading-4 md:text-heading-1 lg:w-[70%] whitespace-pre-line font-medium leading-tight md:leading-tight"
          >
            {t("heading")}
          </h2>
        </div>
      </div>

      {/* Mobile Feed (No Pinning) */}
      <div className="lg:hidden px-4 md:px-8 gap-12 mb-12">
        {[
          { img: project1, title: "Anna Hendra" },
          { img: project2, title: "Amanda Terrada" },
          { img: project3, title: "Oasys" },
          { img: project4, title: "Mola" },
          { img: project5, title: "Vaulted" },
          { img: project6, title: "Nova Agency" },
        ].map((proj, idx) => (
          <div key={idx} className="project-card-wrapper mb-12">
            <ProjectCard image={proj.img} title={proj.title} year="2025" />
          </div>
        ))}
      </div>

      {/* Desktop Feed (This scrolls past the pinned header) */}
      <div className="hidden lg:grid grid-cols-2 gap-x-12 gap-y-32 2xl:container mx-auto px-4 md:px-8 lg:px-14 relative z-20 pb-300">
        {[
          { img: project1, title: "Anna Hendra" },
          { img: project2, title: "Amanda Terrada" },
          { img: project3, title: "Oasys" },
          { img: project4, title: "Mola" },
          { img: project5, title: "Vaulted" },
          { img: project6, title: "Nova Agency" },
        ].map((proj, idx) => (
          <div
            key={idx}
            className={`project-card-wrapper ${idx % 2 !== 0 ? "lg:mt-128" : ""}`}
          >
            <ProjectCard image={proj.img} title={proj.title} year="2025" />
          </div>
        ))}
      </div>
    </section>
  );
}
