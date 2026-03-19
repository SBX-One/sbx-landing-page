"use client";

import React, { useRef } from "react";
import SectionTitle from "../../SectionTitle";
import { useTranslations } from "next-intl";
import step1 from "@/app/_assets/how/step-1.svg";
import step2 from "@/app/_assets/how/step-2.svg";
import step3 from "@/app/_assets/how/step-3.svg";
import step4 from "@/app/_assets/how/step-4.svg";
import step5 from "@/app/_assets/how/step-5.svg";
import step6 from "@/app/_assets/how/step-6.svg";
import particle from "@/app/_assets/how/Frame 1984079767.svg";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HowItWorks() {
  const t = useTranslations("HowItWorks");
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !headingRef.current) return;

      // Text Split for Heading
      const recursiveSplit = (node: Node) => {
        if (node.nodeType === 3) {
          const text = node.textContent || "";
          const fragment = document.createDocumentFragment();
          text.split("").forEach((char) => {
            const outer = document.createElement("span");
            outer.className = "inline-block overflow-hidden align-top";
            const inner = document.createElement("span");
            inner.className =
              "how-heading-char inline-block translate-y-[110%]";
            inner.innerHTML = char === " " ? "&nbsp;" : char;
            outer.appendChild(inner);
            fragment.appendChild(outer);
          });
          node.parentNode?.replaceChild(fragment, node);
        } else if (node.nodeType === 1) {
          Array.from(node.childNodes).forEach(recursiveSplit);
        }
      };

      recursiveSplit(headingRef.current);

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      // Heading animation
      const chars = gsap.utils.toArray(".how-heading-char");
      timeline.to(chars, {
        y: 0,
        duration: 0.8,
        stagger: 0.01,
        ease: "power3.out",
      });

      // Individual card entrance animations with ScrollTrigger
      const cards = gsap.utils.toArray<HTMLElement>(".how-step-card");
      cards.forEach((card) => {
        // Set initial state
        gsap.set(card, {
          opacity: 0,
          y: 80,
          scale: 0.95,
        });

        // Animate in when card enters viewport
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "restart   reverse",
          },
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          delay: 0.1,
          ease: "power3.out",
        });

        // Animate inner children (number + content) with stagger
        const children = card.children;
        gsap.set(children, {
          opacity: 0,
          y: 30,
        });

        gsap.to(children, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "restart none none reverse",
          },
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.3,
          stagger: 0.12,
          ease: "power2.out",
        });
      });

      // Particle entrance
      gsap.set(".how-particle", { opacity: 0, scale: 0.5 });
      gsap.to(".how-particle", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0.5,
        scale: 1,
        duration: 1.5,
        ease: "back.out(1.7)",
      });

      // Steady floating
      gsap.to(".how-particle", {
        y: "+=30",
        x: "+=20",
        rotate: 15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Mouse Parallax
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 50;
        const yPos = (clientY / window.innerHeight - 0.5) * 50;

        gsap.to(".how-particle", {
          x: xPos * 0.5,
          y: yPos * 0.5,
          duration: 1.5,
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
      className="px-4 md:px-8 lg:px-14 py-12 md:py-25 2xl:container mx-auto relative overflow-clip "
    >
      <div className="sticky top-0 pb-40">
        <div className="flex flex-col items-center text-center gap-8 mb-100 px-4 sticky top-30 md:top-40">
          <SectionTitle title={t("title")} />
          <h1
            ref={headingRef}
            className="text-heading-5 md:text-heading-1 font-medium lg:w-[80%]"
          >
            {t("heading")}
          </h1>
          <Image
            src={particle}
            alt=""
            className="how-particle size-50 absolute top-12 right-4  -z-1"
          />
        </div>

        <div className="flex flex-col gap-70 items-center ">
          {/* Step 01 */}
          <div className="how-step-card p-8 md:p-16 bg-secondary-500 rounded-2xl flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16 lg:w-[80%] sticky top-90 md:top-100 min-h-70 overflow-hidden border border-neutral-400">
            <p className="text-pixel-base md:text-pixel-lg whitespace-nowrap">
              [ 01 ]
            </p>
            <div className="flex flex-col gap-4 relative z-10">
              <h2 className="text-heading-6 md:text-heading-4 font-semibold">
                {t("step-1-title")}
              </h2>
              <p className="text-body-sm md:text-body-base font-medium lg:w-[70%]">
                {t("step-1-description")}
              </p>
            </div>
            <Image
              src={step1}
              alt=""
              className="w-[465.6px] h-72.75 absolute -top-8 -right-32 hidden lg:block"
            />
          </div>

          {/* Step 02 */}
          <div className="how-step-card p-8 md:p-16 bg-neutral-50 rounded-2xl flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16 lg:w-[80%] sticky top-90 md:top-100 min-h-70 overflow-hidden border border-neutral-400 text-neutral-900">
            <p className="text-pixel-base md:text-pixel-lg whitespace-nowrap">
              [ 02 ]
            </p>
            <div className="flex flex-col gap-4 relative z-10">
              <h2 className="text-heading-6 md:text-heading-4 font-semibold">
                {t("step-2-title")}
              </h2>
              <p className="text-body-sm md:text-body-base font-medium lg:w-[70%]">
                {t("step-2-description")}
              </p>
            </div>
            <Image
              src={step2}
              alt=""
              className="w-[465.6px] h-72.75 absolute -top-3.5 -left-24 hidden lg:block"
            />
          </div>

          {/* Step 03 */}
          <div className="how-step-card p-8 md:p-16 bg-neutral-900 rounded-2xl flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16 lg:w-[80%] sticky top-90 md:top-100 min-h-70 overflow-hidden border border-neutral-400">
            <p className="text-pixel-base md:text-pixel-lg whitespace-nowrap">
              [ 03 ]
            </p>
            <div className="flex flex-col gap-4 relative z-10">
              <h2 className="text-heading-6 md:text-heading-4 font-semibold">
                {t("step-3-title")}
              </h2>
              <p className="text-body-sm md:text-body-base font-medium lg:w-[70%]">
                {t("step-3-description")}
              </p>
            </div>
            <Image
              src={step3}
              alt=""
              className="w-[465.6px] h-64 absolute -top-4 -right-24 hidden lg:block"
            />
          </div>

          {/* Step 04 */}
          <div className="how-step-card p-8 md:p-16 bg-primary-700 rounded-2xl flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16 lg:w-[80%] sticky top-90 md:top-100 min-h-70 overflow-hidden border border-neutral-400">
            <p className="text-pixel-base md:text-pixel-lg whitespace-nowrap">
              [ 04 ]
            </p>
            <div className="flex flex-col gap-4 relative z-10">
              <h2 className="text-heading-6 md:text-heading-4 font-semibold">
                {t("step-4-title")}
              </h2>
              <p className="text-body-sm md:text-body-base font-medium lg:w-[70%]">
                {t("step-4-description")}
              </p>
            </div>
            <Image
              src={step4}
              alt=""
              className="w-[465.6px] h-64 absolute -top-20 left-36 hidden lg:block"
            />
          </div>

          {/* Step 05 */}
          <div className="how-step-card p-8 md:p-16 bg-neutral-50 rounded-2xl flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16 lg:w-[80%] sticky top-90 md:top-100 min-h-70 overflow-hidden border border-neutral-400 text-neutral-900">
            <p className="text-pixel-base md:text-pixel-lg whitespace-nowrap">
              [ 05 ]
            </p>
            <div className="flex flex-col gap-4 relative z-10">
              <h2 className="text-heading-6 md:text-heading-4 font-semibold">
                {t("step-5-title")}
              </h2>
              <p className="text-body-sm md:text-body-base font-medium lg:w-[70%]">
                {t("step-5-description")}
              </p>
            </div>
            <Image
              src={step5}
              alt=""
              className="w-[465.6px] h-72.75 absolute top-8 right-2 hidden lg:block"
            />
          </div>

          {/* Step 06 */}
          <div className="how-step-card p-8 md:p-16 bg-neutral-900 rounded-2xl flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16 lg:w-[80%] sticky top-90 md:top-100 min-h-70 overflow-hidden border border-neutral-400">
            <p className="text-pixel-base md:text-pixel-lg whitespace-nowrap">
              [ 06 ]
            </p>
            <div className="flex flex-col gap-4 relative z-10">
              <h2 className="text-heading-6 md:text-heading-4 font-semibold">
                {t("step-6-title")}
              </h2>
              <p className="text-body-sm md:text-body-base font-medium lg:w-[70%]">
                {t("step-6-description")}
              </p>
            </div>
            <Image
              src={step6}
              alt=""
              className="w-[465.6px] h-72.75 absolute top-0 -left-4 hidden lg:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
