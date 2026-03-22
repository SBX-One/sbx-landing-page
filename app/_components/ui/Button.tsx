"use client";

import Link from "next/link";
import Icon from "./Icon";

type Variant = "default" | "outline";
type Color = "primary" | "white";
type Size = "md" | "lg";
type Style = "standard" | "pill";

type BaseProps = {
  children?: React.ReactNode;
  variant?: Variant;
  color?: Color;
  size?: Size;
  style?: Style;
  leftIcon?: boolean;
  rightIcon?: boolean;
  className?: string;
  fullWidth?: boolean;
  onClick?: () => void;
  target?: "_blank" | "_self" | "_parent" | "_top";
};

/**
 * Polymorphic Props
 */
type ButtonProps =
  | (BaseProps & {
      as?: "button";
      href?: never;
    })
  | (BaseProps & {
      as: "link";
      href: string;
    });

export default function Button({
  children,
  variant = "default",
  color = "primary",
  size = "md",
  style = "standard",
  leftIcon = false,
  rightIcon = false,
  className = "",
  fullWidth = false,
  target,
  ...props
}: ButtonProps) {
  /**
   * BASE
   */
  const baseClass =
    "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full";

  /**
   * SIZE + STYLE (COMPOUND)
   */
  const sizeStyleClass = {
    lg: {
      standard: "gap-3 py-4 px-8 text-label-base ",
      pill: "gap-3 py-3 px-6 text-label-base ",
    },
    md: {
      standard: "gap-3 py-3 px-6 text-label-sm ",
      pill: "gap-3 py-2 px-4 text-label-sm ",
    },
  };

  /**
   * VARIANT + COLOR
   */
  const variantColorClass = {
    primary: {
      default:
        "bg-secondary-500 text-white hover:bg-secondary-700 active:bg-secondary-800",
      outline:
        "border border-secondary-500 text-secondary-500 hover:bg-secondary-50",
    },
    white: {
      default:
        "bg-white text-neutral-900  hover:shadow-[0px_0px_40px_0px] shadow-white/30 active:bg-neutral-200",
      outline: "border border-white text-white hover:bg-white/10",
    },
  };

  /**
   * ICON THEME
   */
  const iconThemeMap = {
    primary: {
      default: "light",
      outline: "dark",
    },
    white: {
      default: "dark",
      outline: "dark",
    },
  } as const;

  const iconTheme = iconThemeMap[color][variant];

  /**
   * MERGE CLASS
   */
  const classes = `
    ${baseClass}
    ${sizeStyleClass[size][style]}
    ${variantColorClass[color][variant]}
    ${fullWidth ? "w-full" : ""}
    ${className}
  `;

  /**
   * CONTENT
   */
  const content = (
    <div className="flex items-center  relative h-[1.2em]">
      {leftIcon && (
        <div className="mr-2 transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:scale-110">
          <Icon type="default" width={20} height={20} theme={iconTheme} />
        </div>
      )}

      <div className="relative overflow-hidden h-full flex flex-col justify-center">
        <div className="transition-transform duration-200 cubic-bezier(0.19, 1, 0.22, 1) group-hover:-translate-y-full flex flex-col h-full items-center">
          <span className="flex items-center h-full whitespace-nowrap min-w-max">
            {children}
          </span>
          <span className="flex items-center h-full whitespace-nowrap min-w-max absolute top-full">
            {children}
          </span>
        </div>
      </div>

      {rightIcon && (
        <div className="ml-2 transition-all duration-500 cubic-bezier(0.19, 1, 0.22, 1) group-hover:translate-x-1 group-hover:-translate-y-1">
          <Icon type="default" width={20} height={20} theme={iconTheme} />
        </div>
      )}
    </div>
  );

  /**
   * LINK
   */
  if (props.as === "link") {
    return (
      <a
        href={props.href}
        target={target}
        className={`group ${classes}`}
        onClick={props.onClick}
      >
        {content}
      </a>
    );
  }

  /**
   * BUTTON
   */
  return (
    <button onClick={props.onClick} className={`group ${classes}`}>
      {content}
    </button>
  );
}
