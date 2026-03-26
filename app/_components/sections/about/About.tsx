"use client";

import React, { useRef } from "react";
import SectionTitle from "../../SectionTitle";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const t = useTranslations("About");
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!textRef.current) return;

      // Simple stagger for heading and content
      gsap.from(".about-content-item", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 100,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="about"
      className="px-4 md:px-8 lg:px-14 py-12 md:py-25 2xl:container mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-2 about-content-item">
          <SectionTitle title={t("title")} />
        </div>
        <div className="lg:col-span-10 about-content-item">
          <p
            ref={textRef}
            className="text-heading-6 md:text-heading-3 font-medium whitespace-pre-line "
          >
            {t.rich("description", {
              highlight: (chunks) => (
                <span className="text-neutral-400 font-medium">{chunks}</span>
              ),
              br: () => <br />,
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
