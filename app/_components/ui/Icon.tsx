"use client";

import Image from "next/image";

/**
 * LIGHT ICONS
 */
import defaultLight from "@/app/_assets/icon/light/icon=arrow.svg";
import checkLight from "@/app/_assets/icon/light/icon=check.svg";
import closeLight from "@/app/_assets/icon/light/icon=close.svg";
import downLight from "@/app/_assets/icon/light/icon=down.svg";
import humbergerLight from "@/app/_assets/icon/light/icon=humberger.svg";
import starLight from "@/app/_assets/icon/light/icon=star.svg";
import wrapLight from "@/app/_assets/icon/light/Union.svg";

/**
 * DARK ICONS
 */
import defaultDark from "@/app/_assets/icon/dark/icon=arrow.svg";
import checkDark from "@/app/_assets/icon/dark/icon=check.svg";
import closeDark from "@/app/_assets/icon/dark/icon=close.svg";
import downDark from "@/app/_assets/icon/dark/icon=down.svg";
import humbergerDark from "@/app/_assets/icon/dark/icon=humberger.svg";
import starDark from "@/app/_assets/icon/dark/icon=star.svg";

type IconType =
  | "default"
  | "check"
  | "close"
  | "down"
  | "humberger"
  | "star"
  | "wrap";

type Theme = "light" | "dark";

const iconMap = {
  light: {
    default: defaultLight,
    check: checkLight,
    close: closeLight,
    down: downLight,
    humberger: humbergerLight,
    star: starLight,
    wrap: wrapLight,
  },
  dark: {
    default: defaultDark,
    check: checkDark,
    close: closeDark,
    down: downDark,
    humberger: humbergerDark,
    star: starDark,
    wrap: wrapLight,
  },
};

export default function Icon({
  type,
  width = 20,
  height = 20,
  theme = "light",
  className = "",
}: {
  type: IconType;
  width?: number;
  height?: number;
  theme?: Theme;
  className?: string;
}) {
  return (
    <Image
      src={iconMap[theme][type]}
      alt={`${type} icon`}
      width={width}
      height={height}
      className={`object-contain ${className}`}
    />
  );
}
