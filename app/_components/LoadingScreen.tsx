"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useLoading } from "./LoadingContext";

export default function LoadingScreen() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isDone, setIsDone] = useState(false);
  const { setLoadingDone } = useLoading();

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;

    // Lock scroll during loading
    document.body.style.overflow = "hidden";

    // Create a faster timeline for mobile
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setLoadingDone();
        setIsDone(true);
      },
      defaults: {
        duration: isMobile ? 0.6 : 0.8, // Significantly faster animations on mobile
      },
    });

    // Initial state
    gsap.set(logoRef.current, {
      scale: 0.6,
      opacity: 0,
      filter: "blur(20px)",
    });
    gsap.set(progressRef.current, {
      scaleX: 0,
      transformOrigin: "left center",
    });
    gsap.set(textRef.current, { opacity: 0, y: 10 });
    gsap.set(glowRef.current, { scale: 0.5, opacity: 0 });

    // Animation sequence
    tl
      // Glow pulse behind logo
      .to(glowRef.current, {
        scale: 1.2,
        opacity: 0.6,
        duration: isMobile ? 0.4 : 0.8,
        ease: "power2.out",
      })
      // Logo entrance
      .to(
        logoRef.current,
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: isMobile ? 0.6 : 0.8,
          ease: "expo.out",
        },
        "-=0.6",
      )
      // Brand text
      .to(
        textRef.current,
        {
          opacity: 1,
          y: 0,
          duration: isMobile ? 0.3 : 0.6,
          ease: "power3.out",
        },
        "-=0.4",
      )
      // Progress bar fill (Make this faster on mobile)
      .to(progressRef.current, {
        scaleX: 1,
        duration: isMobile ? 0.8 : 1,
        ease: "power2.inOut",
      })
      // Hold for a brief moment
      .to({}, { duration: isMobile ? 0.1 : 0.3 })
      // Logo pulse out
      .to(logoRef.current, {
        scale: 1.15,
        duration: 0.2,
        ease: "power2.in",
      })
      .to(logoRef.current, {
        scale: 0.8,
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.3,
        ease: "power2.in",
      })
      // Fade out text and progress
      .to(
        [textRef.current, progressRef.current?.parentElement].filter(Boolean),
        {
          opacity: 0,
          y: -10,
          duration: 0.2,
          ease: "power2.in",
        },
        "<",
      )
      // Glow shrink
      .to(
        glowRef.current,
        {
          scale: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        },
        "<",
      )
      // Overlay reveal — split curtain
      .to(overlayRef.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: isMobile ? 0.5 : 0.8,
        ease: "power4.inOut",
      });

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [setLoadingDone]);

  if (isDone) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse at center, #0a0a1a 0%, #050505 70%)",
        clipPath: "inset(0 0 0% 0)",
      }}
    >
      {/* Background glow */}
      <div
        ref={glowRef}
        className="absolute w-80 h-80 md:w-120 md:h-120 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,45,248,0.25) 0%, rgba(0,119,255,0.08) 50%, transparent 70%)",
        }}
      />

      {/* Logo */}
      <div ref={logoRef} className="relative z-10 mb-8">
        <Image
          src="/logo.svg"
          alt="SBXOne Logo"
          width={120}
          height={120}
          className="w-16 h-16 md:w-24 md:h-24"
          priority
        />
      </div>

      {/* Brand text */}
      <span
        ref={textRef}
        className="relative z-10 text-heading-6 md:text-heading-5 font-semibold tracking-wider text-neutral-100 mb-10"
      >
        SBXOne
      </span>

      {/* Progress bar */}
      <div className="relative z-10 w-48 md:w-64 h-0.5 bg-neutral-800 rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full rounded-full"
          style={{
            background:
              "linear-gradient(90deg, var(--color-primary-500), var(--color-secondary-500))",
          }}
        />
      </div>
    </div>
  );
}
