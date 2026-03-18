"use client";

import React, { useRef } from "react";
import SectionTitle from "../../SectionTitle";
import { useTranslations } from "next-intl";
import Accordion from "../../ui/Accordion";
import Image from "next/image";
import particle1 from "@/app/_assets/expertise/Rectangle 24345.svg";
import particle2 from "@/app/_assets/expertise/Frame 1984079745.svg";

import preview1 from "@/ui_ux_design_preview_1773851554658.png";
import preview2 from "@/website_modernization_preview_1773851578125.png";
import preview3 from "@/website_development_preview_1773851602178.png";
import preview4 from "@/maintenance_support_preview_1773851634431.png";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Expertise() {
  const t = useTranslations("Expertise");
  const container = useRef<HTMLElement>(null);

  const images = [preview1, preview2, preview3, preview4];

  useGSAP(
    () => {
      if (!container.current) return;

      // Section Entrance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.from(
        ".expertise-heading",
        { opacity: 0, y: 200, duration: 1.8 },
        "-=0.6",
      ).from(
        ".expertise-accordion",
        { opacity: 0, y: 60, stagger: 0.4, duration: 1.2 },
        "-=0.6",
      );

      // Particles Entrance
      gsap.set(".expertise-particle", { opacity: 0, scale: 0.8 });
      gsap.to(".expertise-particle", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0.5,
        scale: 1,
        duration: 1.5,
        stagger: 0.3,
      });

      // Floating Particles
      gsap.to(".expertise-particle", {
        y: "+=20",
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 0.5, from: "random" },
      });

      const handleMouseMove = (e: MouseEvent) => {
        // Parallax for particles
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 50;
        const yPos = (clientY / window.innerHeight - 0.5) * 50;

        gsap.to(".expertise-particle-1", {
          x: xPos * 0.4,
          y: yPos * 0.4,
          duration: 1.5,
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      id="expertise"
      className="px-4 md:px-8 lg:px-14 py-12 md:py-25 2xl:container mx-auto relative overflow-hidden"
    >
      <Image
        src={particle2}
        alt=""
        className="expertise-particle expertise-particle-2 absolute top-248 left-0 -z-1 lg:hidden"
      />
      <Image
        src={particle1}
        alt=""
        className="expertise-particle expertise-particle-1 absolute top-0 right-0 z-0 size-12 md:size-25"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        <div className=" lg:col-span-3">
          <SectionTitle title={t("title")} />
        </div>
        <div className="expertise-heading lg:col-span-9">
          <h1 className="text-heading-4 md:text-heading-1 font-medium">
            {t("heading")}
          </h1>
        </div>
      </div>

      <div className="relative z-10">
        {[
          {
            id: 1,
            title: "UI/UX Design",
            desc: t("ui/ux"),
            tags: [
              "User Research",
              "User Interface",
              "Information Architecture",
              "Wireframing",
              "Prototyping",
            ],
          },
          {
            id: 2,
            title: "Website Modernization",
            desc: t("website-modernization"),
            tags: [
              "UI Redesign",
              "Performance Audit",
              "Migration",
              "Visual Refresh",
              "Competitor Analyst",
            ],
          },
          {
            id: 3,
            title: "Website Development",
            desc: t("website-development"),
            tags: [
              "Web App",
              "Company Profile",
              "Landing Page",
              "Dashboard",
              "Api Integration",
            ],
          },
          {
            id: 4,
            title: "Maintenance & Support",
            desc: t("maintenance-support"),
            tags: [
              "Security Updates",
              "Bug Squashing",
              "Performance Tuning",
              "Health Monitoring",
              "Continuous Scaling",
            ],
          },
        ].map((item, idx) => (
          <div key={item.id} className="expertise-accordion">
            <Accordion
              number={`0${item.id}`}
              title={item.title}
              description={item.desc}
              tags={item.tags}
              image={images[idx]}
              defaultOpen={idx === 0}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
