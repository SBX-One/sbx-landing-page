"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { useTranslations } from "next-intl";
import Button from "../ui/Button";
import Tag from "../ui/Tag";
import Icon from "../ui/Icon";
import Selector from "../ui/Selector";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const t = useTranslations("Footer");
  const footerRef = useRef<HTMLElement>(null);
  const leftSideRef = useRef<HTMLDivElement>(null);
  const rightSideRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          end: "bottom bottom",
          toggleActions: "play none none none",
        },
      });

      tl.from(leftSideRef.current?.children ?? [], {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
      });

      tl.from(
        rightSideRef.current?.querySelectorAll("li") ?? [],
        {
          x: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power4.out",
        },
        "-=0.8",
      );

      tl.from(
        bottomRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4",
      );
    },
    { scope: footerRef },
  );

  return (
    <footer
      ref={footerRef}
      className="px-4 md:px-8 lg:px-14 py-6 md:py-6 lg:py-8 bg-neutral-900 min-h-[85vh] overflow-hidden"
    >
      <div className="2xl:container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 lg:mb-24">
          <div ref={leftSideRef} className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-6">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={999}
                height={999}
                className="w-12 md:w-8 lg:w-12"
              />
              <strong className="text-body-lg md:text-body-xl lg:text-heading-6 font-semibold">
                SBX One Studio
              </strong>
            </div>
            <div>
              <div className="flex flex-col gap-8 mb-9">
                <h1
                  dangerouslySetInnerHTML={{ __html: t("title") }}
                  className="text-heading-3 md:text-heading-2 lg:text-heading-1 font-semibold"
                />
                <p
                  dangerouslySetInnerHTML={{ __html: t("description") }}
                  className="text-body-base font-medium"
                />
                <Button
                  variant="default"
                  size="md"
                  color="primary"
                  leftIcon={true}
                  style="standard"
                  className="w-fit"
                >
                  {t("cta")}
                </Button>
              </div>
              <div className="text-neutral-50">
                <address className="text-body-base font-medium not-italic ">
                  labs.sharkbyte@gmail.com
                </address>
                <address className="text-body-sm font-medium opacity-80 not-italic">
                  Based in Bali, Indonesia
                </address>
              </div>
            </div>
          </div>
          <div className="hidden lg:block"></div>
          <div ref={rightSideRef} className="lg:col-span-6">
            <ul>
              {[
                { id: "01", label: "About" },
                { id: "02", label: "Projects" },
                { id: "03", label: "Pricing" },
              ].map((item, index) => (
                <li key={index}>
                  <span className="hidden md:block">
                    <Selector number={item.id} label={item.label} size="md" />
                  </span>
                  <span className="md:hidden">
                    <Selector number={item.id} label={item.label} size="sm" />
                  </span>
                </li>
              ))}
              <li className="flex items-center justify-between py-8 border-b border-neutral-500">
                <div className="flex items-center gap-5">
                  <span className="hidden lg:block text-pixel-sm md:text-pixel-base">
                    [ 04 ]
                  </span>
                  <ul className="flex gap-1">
                    {[
                      { label: "Instagram", href: "#" },
                      { label: "Dribble", href: "#" },
                      { label: "Behance", href: "#" },
                    ].map((item, index) => (
                      <li key={index}>
                        <Tag as="link" style="pixel" size="sm" href={item.href}>
                          {item.label}
                        </Tag>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <strong
          ref={bottomRef as unknown as React.RefObject<HTMLParagraphElement>}
          className="text-body-sm font-medium text-neutral-400 text-center block"
        >
          @ 2025 SBX One. All rights reserved
        </strong>
      </div>
    </footer>
  );
}
