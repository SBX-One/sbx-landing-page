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

      const textElement = textRef.current;

      /**
       * Recursively splits text nodes into spans to animate each character
       */
      const recursiveSplit = (node: Node) => {
        if (node.nodeType === 3) {
          const text = node.textContent || "";
          const fragment = document.createDocumentFragment();

          text.split("").forEach((char) => {
            const outer = document.createElement("span");
            outer.className = "inline-block overflow-hidden align-top";
            const inner = document.createElement("span");
            inner.className = "about-char inline-block translate-y-[110%]";
            inner.innerHTML = char === " " ? "&nbsp;" : char;
            outer.appendChild(inner);
            fragment.appendChild(outer);
          });

          node.parentNode?.replaceChild(fragment, node);
        } else if (node.nodeType === 1) {
          Array.from(node.childNodes).forEach(recursiveSplit);
        }
      };

      // Apply character splitting to the text element
      recursiveSplit(textElement);

      // Animate the characters
      const chars = gsap.utils.toArray(".about-char");
      gsap.to(chars, {
        scrollTrigger: {
          trigger: textElement,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 0,
        duration: 1.2,
        stagger: 0.01,
        ease: "power3.out",
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="px-4 md:px-8 lg:px-14 py-12 md:py-25 2xl:container mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-2">
          <SectionTitle title={t("title")} />
        </div>
        <div className="lg:col-span-10">
          <p className="sr-only">
            {t.rich("description", {
              highlight: (chunks) => chunks,
              br: () => "\n",
            })}
          </p>
          <p
            ref={textRef}
            aria-hidden="true"
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
