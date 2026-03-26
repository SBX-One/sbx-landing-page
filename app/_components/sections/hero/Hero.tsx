"use client";

import React, { useRef } from "react";
import AvatarStack from "../../AvatarStack";
import { useTranslations } from "next-intl";
import Button from "../../ui/Button";
import Image from "next/image";
import mockup from "@/app/_assets/mockups/Free Laptop Mockup.webp";
import ProjectCarousel from "./ProjectCarousel";
import particleELipse from "@/app/_assets/hero/Ellipse 15.svg";
import particle1 from "@/app/_assets/hero/Frame 1984079743.png";
import particle2 from "@/app/_assets/hero/Frame 1984079749.png";
import particle3 from "@/app/_assets/hero/Frame 1984079750.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLoading } from "../../LoadingContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const t = useTranslations("Hero");
  const sectionRef = useRef<HTMLElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const { isLoadingDone } = useLoading();

  useGSAP(
    () => {
      if (!isLoadingDone) return;

      // Quick setters for high-performance parallax
      const xSet1 = gsap.quickSetter(".hero-particle-1", "x", "px");
      const ySet1 = gsap.quickSetter(".hero-particle-1", "y", "px");
      const xSet2 = gsap.quickSetter(".hero-particle-2", "x", "px");
      const ySet2 = gsap.quickSetter(".hero-particle-2", "y", "px");
      const xSet3 = gsap.quickSetter(".hero-particle-3", "x", "px");
      const ySet3 = gsap.quickSetter(".hero-particle-3", "y", "px");

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      gsap.set(".hero-particle", { opacity: 0, scale: 0.8 });
      gsap.set(".hero-content-item", { opacity: 0, y: 30 });

      tl.to(".hero-particle", {
        opacity: 1,
        scale: 1,
        duration: 1.8,
        stagger: 0.2,
      })
        .to(
          ".hero-content-item",
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.15,
          },
          "-=1.2",
        )
        .to(
          ".hero-highlight-block",
          {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut",
          },
          "-=0.8",
        )
        .to(
          ".hero-highlight-image",
          {
            y: 0,
            duration: 1,
            ease: "power4.inOut",
          },
          "<",
        );

      let mouseX = 0;
      let mouseY = 0;
      const handleMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 40;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 40;
      };

      // Ticker for smooth, throttled parallax
      const tickerUpdate = () => {
        xSet1(mouseX * 0.5);
        ySet1(mouseY * 0.5);
        xSet2(-mouseX);
        ySet2(-mouseY);
        xSet3(mouseX * 0.8);
        ySet3(-mouseY * 0.8);
      };

      window.addEventListener("mousemove", handleMouseMove);
      gsap.ticker.add(tickerUpdate);

      // Floating animation with ScrollTrigger to pause it when off-screen
      const floatingAnim = gsap.to(".hero-particle", {
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
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) =>
          self.isActive ? floatingAnim.play() : floatingAnim.pause(),
      });

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        gsap.ticker.remove(tickerUpdate);
        floatingAnim.kill();
      };
    },
    { scope: sectionRef, dependencies: [isLoadingDone] },
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="min-h-screen py-12.5 lg:pt-25 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        ref={particlesRef}
      >
        <Image
          src={particleELipse}
          alt="decoration"
          width={1200}
          height={800}
          className="hero-particle min-w-300 lg:w-full h-full rounded-full absolute -top-120 -left-160 lg:-top-170 lg:-left-120 object-cover opacity-50"
        />
        <Image
          src={particle1}
          alt="decoration"
          width={200}
          height={200}
          className="hero-particle hero-particle-1 absolute top-90 -right-4 lg:top-24 lg:right-12 size-24 lg:size-50 object-cover"
        />
        <Image
          src={particle2}
          alt="decoration"
          width={200}
          height={200}
          className="hero-particle hero-particle-2 absolute top-210 md:top-100 left-10 md:left-40 size-24 lg:size-50 object-cover"
        />
        <Image
          src={particle3}
          alt="decoration"
          width={200}
          height={200}
          className="hero-particle hero-particle-3 absolute -top-4 lg:top-160 -right-4 lg:right-64 size-24 lg:size-50 object-cover"
        />
      </div>

      <div className="px-4 md:px-8 lg:px-14 py-6 md:py-6 lg:py-8 2xl:container mx-auto flex flex-col lg:items-center gap-6 md:gap-12 mb-16">
        <div className="hero-content-item flex items-center gap-6 md:gap-12 -mb-4">
          <AvatarStack />
          <p className="text-body-caption md:text-body-lg text-neutral-300 font-medium">
            {t("trust")}
          </p>
        </div>
        <div className="lg:flex flex-col items-center lg:text-center">
          <h1 className="hero-content-item text-heading-3 md:text-display font-semibold mb-6 md:mb-8 md:w-[85%]">
            {t.rich("title", {
              highlight: () => (
                <span className="hidden lg:inline-flex items-center rounded-full overflow-hidden relative h-18 w-50 align-middle mx-2 shadow-2xl">
                  {/* Image that slides up */}
                  <Image
                    src={mockup}
                    alt="Digital infrastructure illustration"
                    width={200}
                    height={24}
                    priority
                    sizes="(max-width: 768px) 100vw, 200px"
                    className="hero-highlight-image rounded-full  transition-all duration-300 ease-in-out h-full w-full object-cover translate-y-full"
                  />
                  {/* White overlay that slides up to reveal */}
                  <div className="hero-highlight-block absolute inset-0 bg-white z-10 rounded-full" />
                </span>
              ),
            })}
          </h1>
          <p className="hero-content-item text-body-sm md:text-body-base font-medium text-neutral-100 lg:w-[47%]">
            {t("description")}
          </p>
        </div>

        {/* Mobile Buttons */}
        <div className="hero-content-item flex md:hidden items-center gap-3">
          <Button
            variant="default"
            size="md"
            color="primary"
            rightIcon={true}
            style="standard"
            className="w-fit"
          >
            {t("ctwa")}
          </Button>
          <Button
            variant="outline"
            size="md"
            color="white"
            style="standard"
            className="w-fit"
          >
            {t("cta")}
          </Button>
        </div>

        {/* Desktop Buttons */}
        <div className="hero-content-item hidden md:flex items-center gap-3">
          <Button
            as="link"
            target="_blank"
            href={t("ctwa-link")}
            variant="default"
            size="lg"
            color="primary"
            rightIcon={true}
            style="standard"
            className="w-fit"
          >
            {t("ctwa")}
          </Button>
          <Button
            as="link"
            target="_self"
            variant="outline"
            href="#pricing"
            size="lg"
            color="white"
            style="standard"
            className="w-fit"
          >
            {t("cta")}
          </Button>
        </div>
      </div>

      <div className="hero-carousel">
        <ProjectCarousel />
      </div>
    </section>
  );
}
