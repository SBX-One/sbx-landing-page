"use client";

import React, { useRef } from "react";
import Icon from "../../ui/Icon";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Stats() {
  const t = useTranslations("Stats");
  const container = useRef<HTMLDivElement>(null);

  const statsData = [
    { value: 20, label: t("portofolio"), suffix: "+" },
    { value: 95, label: t("trust"), suffix: "%" },
    { value: 5, label: t("year"), suffix: "+" },
  ];

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(".stat-item");

      items.forEach((item) => {
        const leftIcon = item.querySelector<HTMLElement>(".icon-left");
        const rightIcon = item.querySelector<HTMLElement>(".icon-right");
        const content = item.querySelector<HTMLElement>(".stat-content");
        const numberSpan = item.querySelector<HTMLElement>(".count-up");

        if (!leftIcon || !rightIcon || !content || !numberSpan) return;

        const targetValue = parseInt(
          numberSpan.getAttribute("data-value") || "0",
        );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        const containerWidth = item.offsetWidth;
        const iconWidth = leftIcon.offsetWidth;
        const moveDistance = containerWidth / 2 - iconWidth / 2;

        gsap.set(leftIcon, { x: moveDistance, opacity: 0 });
        gsap.set(rightIcon, { x: -moveDistance, opacity: 0 });
        gsap.set(content, { opacity: 0, scale: 0.5, y: 10 });

        tl.to([leftIcon, rightIcon], {
          opacity: 1,
          duration: 0.2,
        })
          .to(leftIcon, { x: 0, duration: 0.8, ease: "expo.inOut" }, "reveal")
          .to(rightIcon, { x: 0, duration: 0.8, ease: "expo.inOut" }, "reveal")
          .to(
            content,
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
            },
            "reveal+=0.3",
          )
          .to(
            { val: 0 },
            {
              val: targetValue,
              duration: 2,
              ease: "power2.out",
              onUpdate: function () {
                numberSpan.textContent = Math.floor(
                  this.targets()[0].val,
                ).toString();
              },
            },
            "reveal+=0.5",
          );
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      id="stats"
      className="px-4 md:px-8 lg:px-14 py-12 md:py-25 2xl:container mx-auto"
    >
      <dl className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="stat-item flex justify-between items-center relative overflow-hidden "
          >
            <span className="icon-left z-10">
              <Icon
                type="wrap"
                theme="light"
                width={32}
                height={32}
                className="rotate-180"
              />
            </span>

            <div className="stat-content flex justify-center items-center gap-6 flex-1">
              <dd className="text-pixel-lg ">
                <span className="count-up" data-value={stat.value}>
                  0
                </span>
                {stat.suffix}
              </dd>
              <dt className="text-body-sm  font-medium ">{stat.label}</dt>
            </div>

            <span className="icon-right z-10">
              <Icon type="wrap" theme="light" width={32} height={32} />
            </span>
          </div>
        ))}
      </dl>
    </section>
  );
}
