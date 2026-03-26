"use client";

import React, { useRef } from "react";
import SectionTitle from "../../SectionTitle";
import { useTranslations } from "next-intl";
import Image from "next/image";
import pixel1 from "@/app/_assets/why/Union.svg";
import pixel2 from "@/app/_assets/why/Union-1.svg";
import pixel3 from "@/app/_assets/why/Union-2.svg";
import tech1 from "@/app/_assets/why/Ellipse 1.png";
import tech2 from "@/app/_assets/why/Ellipse 1-1.png";
import tech3 from "@/app/_assets/why/Ellipse 1-2.png";
import tech4 from "@/app/_assets/why/next-js 1.png";
import particle1 from "@/app/_assets/why/particle1.svg";
import particle2 from "@/app/_assets/why/particle2.svg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Why() {
  const t = useTranslations("Why");
  const container = useRef<HTMLElement>(null);


  useGSAP(
    () => {
      if (!container.current) return;

      const isMobile = window.innerWidth < 1024;
      // Animate the cards entering staggered
      const cards = gsap.utils.toArray(".why-card");
      gsap.from(cards, {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Animate pixel icons staggered
      gsap.from(".pixel-icon", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
      });

      // Set initial state for entrance animation
      gsap.set(".why-particle", { opacity: 0, scale: 0.8 });

      // Entrance animation for particles
      gsap.to(".why-particle", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0.5,
        scale: 1,
        duration: 1.2,
        stagger: 0.3,
        ease: "power3.out",
      });

      // Steady floating animation - paused when off-screen (Only on Desktop)
      let floatingAnim: gsap.core.Tween | null = null;
      if (!isMobile) {
        floatingAnim = gsap.to([".pixel-icon", ".why-particle"], {
          y: "+=20",
          duration: "random(2, 4)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: {
            each: 0.5,
            from: "random",
          },
        });

        ScrollTrigger.create({
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) =>
            self.isActive ? floatingAnim?.play() : floatingAnim?.pause(),
        });
      }

      // Parallax quicksetters
      const xSet1 = gsap.quickSetter(".why-particle-1", "x", "px");
      const ySet1 = gsap.quickSetter(".why-particle-1", "y", "px");
      const xSet2 = gsap.quickSetter(".why-particle-2", "x", "px");
      const ySet2 = gsap.quickSetter(".why-particle-2", "y", "px");

      let mouseX = 0,
        mouseY = 0;
      const onMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 50;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 50;
      };

      const tickerUpdate = () => {
        xSet1(mouseX * 0.4);
        ySet1(mouseY * 0.4);
        xSet2(-mouseX * 0.6);
        ySet2(-mouseY * 0.6);
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
    { scope: container },
  );

  return (
    <section
      ref={container}
      id="why-us"
      className="px-4 md:px-8 lg:px-14 py-12 md:py-25 2xl:container mx-auto relative"
    >
      <div className="flex justify-end mb-16 overflow-hidden">
        <SectionTitle title={t("title")} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="why-card bg-neutral-900 p-8 rounded-3xl flex flex-col justify-between h-96 border border-white/5">
          <div className="w-16 h-16 flex items-center justify-center pixel-icon">
            <Image src={pixel1} alt="" width={59} height={59} />
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-body-xl font-medium">{t("content-title-1")}</h3>
            <p className="text-body-sm md:text-body-base font-medium text-neutral-400">
              {t("content-description-1")}
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="why-card bg-neutral-900 p-8 rounded-3xl flex flex-col justify-between h-96 border border-white/5">
          <div className="w-16 h-16 flex items-center justify-center pixel-icon">
            <Image src={pixel2} alt="" width={59} height={59} />
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex gap-2">
              <span className="tech-icon border border-neutral-700/50 flex w-fit rounded-full p-2 bg-neutral-800/50">
                <Image
                  src={tech1}
                  alt="Technology Icon"
                  width={32}
                  height={32}
                />
              </span>
              <span className="tech-icon border border-neutral-700/50 flex w-fit rounded-full p-2 bg-neutral-800/50">
                <Image
                  src={tech2}
                  alt="Technology Icon"
                  width={32}
                  height={32}
                />
              </span>
              <span className="tech-icon border border-neutral-700/50 flex w-fit rounded-full p-2 bg-neutral-800/50">
                <Image
                  src={tech3}
                  alt="Technology Icon"
                  width={32}
                  height={32}
                />
              </span>
              <span className="tech-icon border border-neutral-700/50 flex w-fit rounded-full p-2 bg-neutral-800/50">
                <Image
                  src={tech4}
                  alt="Technology Icon"
                  width={32}
                  height={32}
                />
              </span>
            </div>
            <p className="text-body-sm md:text-body-base font-medium text-neutral-400">
              {t("content-description-2")}
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="why-card bg-neutral-900 p-8 rounded-3xl flex flex-col justify-between h-96 border border-white/5">
          <div className="w-16 h-16 flex items-center justify-center pixel-icon">
            <Image src={pixel3} alt="" width={59} height={59} />
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-body-xl font-medium">{t("content-title-3")}</h3>
            <p className="text-body-sm md:text-body-base font-medium text-neutral-400">
              {t("content-description-3")}
            </p>
          </div>
        </div>
      </div>

      <Image
        src={particle1}
        alt=""
        width={48}
        height={48}
        className="why-particle size-12 lg:size-25 why-particle-1 absolute bottom-110 md:bottom-18 left-0 -z-10 opacity-50"
      />
      <Image
        src={particle2}
        alt=""
        width={97}
        height={97}
        className="why-particle size-24.25 lg:size-50 why-particle-2 absolute bottom-4 md:bottom-18 right-0 -z-10 opacity-50"
      />
    </section>
  );
}
