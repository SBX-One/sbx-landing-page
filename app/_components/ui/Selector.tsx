"use client";

import React from "react";
import Icon from "./Icon";

type BaseProps = {
  label?: string;
  active?: boolean;
  size?: "xs" | "sm" | "md";
  className?: string;
};

type SelectorProps = (
  | { as?: "div"; onClick?: never }
  | {
      as: "button";
      onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    }
) &
  BaseProps;

export default function Selector({
  label = "About",
  active = false,
  size = "md",
  as = "div",
  className = "",
  ...props
}: SelectorProps) {
  const sizeConfig = {
    xs: {
      number: "text-pixel-sm",
      label: "text-body-lg",
      icon: 24,
    },
    sm: {
      number: "text-pixel-base",
      label: "text-heading-6",
      icon: 32,
    },
    md: {
      number: "text-pixel-base",
      label: "text-heading-4",
      icon: 48,
    },
  };

  const config = sizeConfig[size];

  const componentClasses = `flex w-full items-center justify-between py-4 border-b border-neutral-500 group relative transition-all duration-200  ${
    active
      ? "opacity-100 text-white "
      : "opacity-40 before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:bg-linear-to-r before:from-secondary-500 before:to-secondary-500/0 before:transition-all before:duration-500 hover:text-white hover:shadow-xs hover:px-4 hover:before:left-0 hover:before:w-full before:w-0"
  } ${className}`;

  const content = (
    <>
      <div className="flex items-center gap-5 relative z-10 transition-all duration-200 text-left">
        <span className={`${config.label} font-medium`}>{label}</span>
      </div>

      <Icon
        type="default"
        theme="light"
        height={config.icon}
        width={config.icon}
        className={`transition-transform duration-300 relative z-10 ${
          active ? "rotate-90" : "rotate-0"
        }`}
      />
    </>
  );

  if (as === "button") {
    return (
      <button
        type="button"
        onClick={props.onClick}
        className={`${componentClasses} appearance-none outline-none focus:outline-none w-full`}
      >
        {content}
      </button>
    );
  }

  return <div className={componentClasses}>{content}</div>;
}
