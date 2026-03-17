"use client";

import React from "react";
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
};

/**
 * Polymorphic Props
 */
type ButtonProps =
  | (BaseProps & {
      as?: "button";
      onClick?: () => void;
      href?: never;
    })
  | (BaseProps & {
      as: "link";
      href: string;
      onClick?: never;
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
      default: "bg-primary-500 text-white hover:bg-primary-600",
      outline: "border border-primary-500 text-primary-500 hover:bg-primary-50",
    },
    white: {
      default: "bg-white text-neutral-900 hover:bg-neutral-100",
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
    ${className}
  `;

  /**
   * CONTENT
   */
  const content = (
    <>
      {leftIcon && (
        <Icon type="default" width={20} height={20} theme={iconTheme} />
      )}
      {children}
      {rightIcon && (
        <Icon type="default" width={20} height={20} theme={iconTheme} />
      )}
    </>
  );

  /**
   * LINK
   */
  if (props.as === "link") {
    return (
      <a href={props.href} className={classes}>
        {content}
      </a>
    );
  }

  /**
   * BUTTON
   */
  return (
    <button onClick={props.onClick} className={classes}>
      {content}
    </button>
  );
}
