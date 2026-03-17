import React from "react";

type Style = "default" | "pixel";
type Size = "sm" | "md";

type BaseProps = {
  children: React.ReactNode;
  style?: Style;
  size?: Size;
  className?: string;
};

/**
 * Polymorphic Props
 */
type TagProps =
  | (BaseProps & {
      as?: "span";
      href?: never;
    })
  | (BaseProps & {
      as: "link";
      href: string;
    });

export default function Tag({
  children,
  style = "default",
  size = "md",
  className = "",
  ...props
}: TagProps) {
  /**
   * STYLE (FONT FAMILY)
   */
  const styleClass = {
    default: "font-manrope",
    pixel: "font-pixelify-sans",
  };

  /**
   * SIZE
   */
  const sizeClass = {
    sm: "px-4 py-2",
    md: "px-6 py-3",
  };

  /**
   * FONT SIZE (COMPOUND
   */
  const fontClass = {
    md: {
      default: "text-label-base",
      pixel: "text-pixel-sm",
    },
    sm: {
      default: "text-label-sm",
      pixel: "text-pixel-sm",
    },
  };

  /**
   * BASE
   */
  const baseClass =
    "inline-flex items-center rounded-full bg-neutral-800 hover:bg-secondary-500 transition-colors duration-200";

  const classes = `
    ${baseClass}
    ${styleClass[style]}
    ${sizeClass[size]}
    ${fontClass[size][style]}
    ${className}
  `;

  /**
   * LINK VERSION
   */
  if (props.as === "link") {
    return (
      <a href={props.href} className={classes}>
        {children}
      </a>
    );
  }

  /**
   * DEFAULT (SEMANTIC)
   */
  return <span className={classes}>{children}</span>;
}
