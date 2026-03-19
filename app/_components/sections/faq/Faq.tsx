"use client";

import React, { useRef } from "react";
import SectionTitle from "../../SectionTitle";
import { useTranslations } from "next-intl";
import FAQAccordion from "../../ui/FAQAccordion";
import Button from "../../ui/Button";
import mockup from "@/app/_assets/faq/Rectangle 27411.png";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Faq() {
  const t = useTranslations("Faq");
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Initial states
      gsap.set(".faq-content-item", { opacity: 0, y: 30 });
      gsap.set(".faq-accordion-item", { opacity: 0, y: 40 });
      gsap.set(".faq-mockup-image", { y: "100%" });
      gsap.set(".faq-mockup-block", { yPercent: 0 });

      // Left column content: title, footer text, CTA — fade up on scroll
      gsap.to(".faq-content-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      // FAQ accordion items: staggered fade up
      gsap.to(".faq-accordion-item", {
        scrollTrigger: {
          trigger: ".faq-accordion-item",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });

      // Mockup image: hero-style reveal animation (white block slides up + image slides up)
      const mockupTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".faq-mockup-wrapper",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      mockupTl
        .to(".faq-mockup-block", {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut",
        })
        .to(
          ".faq-mockup-image",
          {
            y: 0,
            duration: 1,
            ease: "power4.inOut",
          },
          "<",
        );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="px-4 md:px-8 lg:px-14 py-12 md:py-25 2xl:container mx-auto relative overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-5">
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="faq-content-item mb-8 lg:mb-0">
              <SectionTitle title="faq" />
            </div>
            <h1 className="faq-content-item text-heading-5 md:text-heading-1 font-medium">
              {t("title")}
            </h1>
          </div>
          <div className="hidden lg:flex flex-col gap-5">
            <div className="faq-mockup-wrapper rounded-xl overflow-hidden relative">
              <Image src={mockup} alt="mockup" className="faq-mockup-image" />
              <div className="faq-mockup-block absolute inset-0 bg-white z-10 rounded-xl w-62.25" />
            </div>
            <p className="faq-content-item text-body-lg font-medium">
              {t("footer")}
            </p>
            <div className="faq-content-item">
              <Button
                variant="outline"
                color="white"
                size="lg"
                style="standard"
              >
                {t("cta")}
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 lg:col-span-7">
          <div className="faq-accordion-item">
            <FAQAccordion question={t("question-1")} answer={t("answer-1")} />
          </div>
          <div className="faq-accordion-item">
            <FAQAccordion question={t("question-2")} answer={t("answer-2")} />
          </div>
          <div className="faq-accordion-item">
            <FAQAccordion question={t("question-3")} answer={t("answer-3")} />
          </div>
          <div className="faq-accordion-item">
            <FAQAccordion question={t("question-4")} answer={t("answer-4")} />
          </div>
          <div className="faq-accordion-item">
            <FAQAccordion question={t("question-5")} answer={t("answer-5")} />
          </div>
        </div>
        <div className="faq-content-item lg:hidden">
          <p className="text-body-lg font-medium mb-4">{t("footer")}</p>
          <Button variant="outline" color="white" size="md" style="standard">
            {t("cta")}
          </Button>
        </div>
      </div>
    </section>
  );
}
