import React from "react";
import Icon from "./Icon";

type BaseProps = {
  number?: string;
  label?: string;
  active?: boolean;
  size?: "xs" | "sm" | "md";
};

export default function Selector({
  number = "01",
  label = "About",
  active = false,
  size = "md",
}: BaseProps) {
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

  return (
    <div className="flex items-center justify-between py-8 border-b border-neutral-500 group relative transition-all duration-100 before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-linear-to-r before:from-secondary-500 before:to-secondary-500/0 before:transition-all before:duration-500 hover:text-white hover:shadow-xs hover:px-4  hover:before:left-0 hover:before:w-full">
      <div className="flex items-center gap-5 relative z-10 transition-all duration-200">
        <span className={config.number}>[ {number} ]</span>
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
    </div>
  );
}
