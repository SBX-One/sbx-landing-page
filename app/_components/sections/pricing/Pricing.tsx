"use client";

import React, { useState, useRef } from "react";
import SectionTitle from "../../SectionTitle";
import { useMessages, useTranslations } from "next-intl";
import AvatarStack from "../../AvatarStack";
import Selector from "../../ui/Selector";
import PricingCard from "../../ui/PricingCard";
import particle1 from "@/app/_assets/pricing/Frame 1984079743.svg";
import particle2 from "@/app/_assets/pricing/Frame 1984079766.svg";
import particle3 from "@/app/_assets/pricing/Frame 1984079744.svg";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Pricing() {
  const t = useTranslations("Pricing");
  const messages = useMessages();
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);


  // Define types for pricing structure
  interface Plan {
    title: string;
    description?: string;
    price?: string;
    type?: "start" | "fixed";
    features: string[];
    "ctwa-link": string;
  }

  interface Category {
    title: string;
    plans: Plan[];
  }

  interface PricingMessages {
    categories: Record<string, Category>;
  }

  const pricingRaw = (messages.Pricing as unknown as PricingMessages) || {};
  const categoriesRaw = pricingRaw.categories || {};

  const categoryKeys = Object.keys(categoriesRaw).filter(
    (key) => key !== "etc",
  );
  const etcCategory = categoriesRaw["etc"];

  const [activeTab, setActiveTab] = useState(categoryKeys[0] || "");

  // Animations logic
  useGSAP(
    () => {
      if (!containerRef.current || !headingRef.current) return;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Simple heading entrance
      timeline.from(".pricing-heading", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      timeline.from(
        ".pricing-tab-item",
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.8",
      );

      // Testimonial Counter & Avatar Stagger
      timeline.from(
        ".pricing-testimonial-stats",
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.8",
      );

      if (counterRef.current) {
        timeline.fromTo(
          counterRef.current,
          { innerHTML: "0" },
          {
            innerHTML: "100",
            duration: 2,
            snap: { innerHTML: 1 },
            ease: "power3.out",
          },
          "-=1",
        );
      }

      // Particle entrance
      gsap.set(".pricing-particle", { opacity: 0, scale: 0.7 });
      gsap.to(".pricing-particle", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0.5,
        scale: 1,
        duration: 1.5,
        stagger: 0.3,
        ease: "back.out(1.7)",
      });

      const isMobile = window.innerWidth < 1024;

      // Floating particles - Only on Desktop
      if (!isMobile) {
        gsap.to(".pricing-particle", {
          y: "+=20",
          duration: "random(2, 4)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: { each: 0.5, from: "random" },
        });
      }
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 50;
        const yPos = (clientY / window.innerHeight - 0.5) * 50;

        gsap.to(".pricing-particle-1", {
          x: xPos * 0.4,
          y: yPos * 0.4,
          duration: 1.5,
        });
        gsap.to(".pricing-particle-2", {
          x: -xPos * 0.6,
          y: -yPos * 0.6,
          duration: 2,
        });
      };

      if (!isMobile) {
        window.addEventListener("mousemove", handleMouseMove);
      }
      return () => {
        if (!isMobile) {
          window.removeEventListener("mousemove", handleMouseMove);
        }
      };
    },
    { scope: containerRef },
  );

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      ".active-tab-cards .pricing-card-reveal",
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        clearProps: "all",
      },
    );
  }, [activeTab]);

  const activeCategory = categoriesRaw[activeTab] || { title: "", plans: [] };
  const plans = activeCategory.plans || [];

  return (
    <section
      ref={containerRef}
      id="pricing"
      className="px-4 md:px-8 lg:px-14 py-12 md:py-25 2xl:container mx-auto relative overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 mb-16 items-start">
        <div className="lg:col-span-3 mb-8 lg:mb-0">
          <SectionTitle title={t("title")} />
        </div>
        <div className="lg:col-span-9">
          <h2
            ref={headingRef}
            className="pricing-heading text-heading-5 md:text-heading-1 font-medium lg:w-[80%] mb-6"
          >
            {t("heading")}
          </h2>
          <div className="pricing-testimonial-stats flex items-center gap-6 md:gap-10">
            <AvatarStack />
            <p className="text-body-base text-neutral-400">
              <span ref={counterRef}>100</span>+ {t("testimonial")}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-16">
        <div className="flex lg:grid lg:grid-cols-5 items-center gap-4 md:gap-6 overflow-x-auto lg:overflow-x-hidden pb-6 no-scrollbar ">
          {categoryKeys.map((key) => (
            <div key={key} className="pricing-tab-item min-w-64 lg:min-w-full">
              <Selector
                as="button"
                label={categoriesRaw[key].title}
                active={activeTab === key}
                onClick={() => setActiveTab(key)}
                size="xs"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 active-tab-cards">
          {plans.map((plan: Plan, i: number) => (
            <div
              key={`${activeTab}-${i}`}
              className="pricing-card-reveal lg:col-span-4"
            >
              <PricingCard
                title={plan.title}
                description={plan.description}
                price={plan.price}
                type={plan.type}
                features={plan.features}
                ctaLabel={t("cta")}
                ctwaLink={plan["ctwa-link"]}
              />
            </div>
          ))}
          {etcCategory.plans.map((plan: Plan, i: number) => (
            <div key={`etc-${i}`} className="pricing-card-reveal lg:col-span-6">
              <PricingCard
                title={plan.title}
                description={plan.description}
                price={plan.price}
                type={plan.type}
                features={plan.features}
                ctaLabel={t("cta")}
                style="horizontal"
                ctwaLink={plan["ctwa-link"]}
              />
            </div>
          ))}
        </div>
      </div>

      <Image
        src={particle1}
        alt=""
        className="pricing-particle pricing-particle-1 absolute -top-12 -left-20 -z-1 hidden lg:block"
      />
      <Image
        src={particle2}
        alt=""
        className="pricing-particle pricing-particle-2 absolute bottom-125 md:bottom-0 right-0 -z-1 opacity-50"
      />
      <Image
        src={particle3}
        alt=""
        className="pricing-particle pricing-particle-3 lg:hidden absolute top-0 right-0"
      />
    </section>
  );
}
