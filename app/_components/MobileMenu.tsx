"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { IoMenu } from "react-icons/io5";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import Button from "./ui/Button";
import Icon from "./ui/Icon";
import Tag from "./ui/Tag";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const socialItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const t = useTranslations("Header");

  useGSAP(
    () => {
      if (isOpen) {
        const tl = gsap.timeline({
          defaults: { ease: "power4.out", duration: 0.8 },
        });

        tl.to(menuRef.current, {
          yPercent: 8,
          autoAlpha: 1,
          duration: 0.8,
        });

        tl.fromTo(
          menuItemsRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.6 },
          "-=0.4",
        );

        tl.fromTo(
          socialItemsRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.05, duration: 0.4 },
          "-=0.4",
        );
      } else {
        // Timeline for closing
        gsap.to(menuRef.current, {
          yPercent: 0,
          autoAlpha: 0,
          duration: 0.6,
          ease: "power4.inOut",
        });
      }
    },
    { scope: container, dependencies: [isOpen] },
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "unset";
    }

    return () => {
      document.body.style.overflowY = "unset";
    };
  }, [isOpen]);

  return (
    <div ref={container} className="lg:hidden">
      <button onClick={() => setIsOpen(true)}>
        <IoMenu className="text-3xl" />
      </button>

      <div
        ref={menuRef}
        className="fixed left-0 right-0 -top-18 min-h-screen z-50 bg-neutral-900 p-4 py-12 pb-16 flex flex-col justify-between invisible opacity-0"
      >
        <div className="flex flex-col gap-16">
          <div className="flex items-center justify-between">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={999}
              height={999}
              className="w-12"
            />

            <div className="flex items-center gap-3">
              <Button
                as="link"
                color="white"
                style="standard"
                size="md"
                leftIcon={true}
                href={t("cta-link")}
                onClick={() => setIsOpen(false)}
              >
                Start a Project
              </Button>
              <button
                className="bg-neutral-600 p-3 rounded-full"
                onClick={() => setIsOpen(false)}
              >
                <Icon type="close" theme="light" height={24} width={24} />
              </button>
            </div>
          </div>
          <ul className="flex gap-2">
            {[
              {
                label: "Instagram",
                href: "https://www.instagram.com/sbxoneteam",
              },
              {
                label: "Dribble",
                href: "https://dribbble.com/sbxonestudio",
              },
              {
                label: "Behance",
                href: "https://www.behance.net/sbxonestudio",
              },
            ].map((item, index) => (
              <li
                key={index}
                ref={(el) => {
                  socialItemsRef.current[index] = el;
                }}
              >
                <Tag
                  as="link"
                  style="pixel"
                  size="sm"
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Tag>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ul>
            {[
              { id: "01", label: "About", href: "#about" },
              { id: "02", label: "Projects", href: "#projects" },
              { id: "03", label: "Pricing", href: "#pricing" },
              { id: "04", label: "FAQ", href: "#faq" },
            ].map((item, index) => (
              <li
                key={index}
                ref={(el) => {
                  menuItemsRef.current[index] = el;
                }}
                className="flex items-center justify-between py-8 border-b border-neutral-500"
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-5"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="font-pixelify-sans">[ {item.id} ]</span>
                  <span className="text-heading-6 font-medium">
                    {item.label}
                  </span>
                </Link>
                <Icon type="default" theme="light" height={32} width={32} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
