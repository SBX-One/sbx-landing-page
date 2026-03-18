"use client";

import React, { useState, useEffect, useRef } from "react";
import Tag from "./Tag";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image, { type StaticImageData } from "next/image";
import { ScrollTrigger } from "gsap/all";

type AccordionProps = {
  number: string;
  title: string;
  description: string;
  tags: string[];
  size?: "sm" | "md";
  image?: StaticImageData;
  defaultOpen?: boolean;
};

export default function Accordion({
  number,
  title,
  description,
  tags,
  size = "md",
  image,
  defaultOpen,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  // handle default open with delay after section entrance
  useGSAP(
    () => {
      if (defaultOpen && !isMobile) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 60%",
          onEnter: () => {
            gsap.delayedCall(0.5, () => setIsOpen(true));
          },
        });
      }
    },
    { dependencies: [defaultOpen, isMobile] },
  );

  // detect screen size
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(
    () => {
      if (isMobile) {
        gsap.set(contentRef.current, { clearProps: "height" });

        // Mobile entrance for tags
        gsap.to(".mobile-tag-item", {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.6,
          ease: "power2.out",
        });
        return;
      }

      gsap.to(contentRef.current, {
        height: isOpen ? "auto" : 0,
        duration: 0.5,
        ease: "power2.inOut",
      });

      if (isOpen) {
        gsap.fromTo(
          ".tag-item",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 0.4,
            ease: "power2.out",
            delay: 0.2,
          },
        );
      } else {
        gsap.to(".tag-item", {
          opacity: 0,
          y: 10,
          duration: 0.2,
        });
      }

      if (image && followerRef.current) {
        xTo.current = gsap.quickTo(followerRef.current, "left", {
          duration: 0.6,
          ease: "power3",
        });
        yTo.current = gsap.quickTo(followerRef.current, "top", {
          duration: 0.6,
          ease: "power3",
        });
      }
    },
    { dependencies: [isOpen, isMobile], scope: containerRef },
  );

  //   const handleMouseMove = (e: React.MouseEvent) => {
  //     if (
  //       !isMobile &&
  //       image &&
  //       containerRef.current &&
  //       xTo.current &&
  //       yTo.current
  //     ) {
  //       const rect = containerRef.current.getBoundingClientRect();
  //       xTo.current(e.clientX - rect.left - 100);
  //       yTo.current(e.clientY - rect.top);
  //     }
  //   };

  return (
    <div
      ref={containerRef}
      //   onMouseEnter={() => !isMobile && image && setIsVisible(true)}
      //   onMouseLeave={() => !isMobile && setIsVisible(false)}
      //   onMouseMove={handleMouseMove}
      onClick={() => !isMobile && setIsOpen(!isOpen)}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-10 lg:py-20 items-start first:border-t-neutral-400 border-t-transparent border-y border-neutral-400 group cursor-pointer transition-colors  relative"
    >
      {/* Moving Preview */}
      {!isMobile && image && (
        <div
          ref={followerRef}
          className={`absolute top-0 left-0 pointer-events-none z-50 transition-opacity duration-300  ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <div
            className="w-40 h-28 rounded-2xl overflow-hidden border border-white/20 shadow-2xl transition-transform duration-500 ease-out"
            style={{ transform: isVisible ? "scale(1)" : "scale(0)" }}
          >
            <Image src={image} alt={title} fill className="object-cover" />
          </div>
        </div>
      )}

      <div className="flex items-center gap-6 lg:col-span-5">
        <span className="text-pixel-sm md:text-pixel-base text-neutral-400">
          [ {number} ]
        </span>
        <strong className="text-heading-6 md:text-heading-4 font-medium  transition-colors">
          {title}
        </strong>
      </div>

      <div className="lg:col-span-7">
        <p className="text-body-sm md:text-body-base font-medium text-neutral-300 max-w-2xl leading-relaxed">
          {description}
        </p>

        <div
          ref={contentRef}
          className="hidden lg:block overflow-hidden h-auto lg:h-0"
        >
          <div className="flex flex-wrap gap-2 pt-8 pb-4">
            {tags.map((tag, index) => (
              <div key={index} className="tag-item opacity-100 lg:opacity-0">
                <span className="hidden lg:block">
                  <Tag>{tag}</Tag>
                </span>
                <span className="lg:hidden">
                  <Tag size="sm">{tag}</Tag>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:hidden overflow-hidden h-auto lg:h-0">
          <div className="flex flex-wrap gap-2 pt-8 pb-4">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="mobile-tag-item opacity-0 translate-y-4"
              >
                <span className="hidden lg:block">
                  <Tag>{tag}</Tag>
                </span>
                <span className="lg:hidden">
                  <Tag size="sm">{tag}</Tag>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
