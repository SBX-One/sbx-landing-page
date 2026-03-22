import React from "react";
import Button from "./Button";
import { FiCheck } from "react-icons/fi";
import Icon from "./Icon";

type PricingCardProps = {
  title: string;
  description?: string;
  price?: string;
  type?: "start" | "fixed" | "";
  features: string[];
  style?: "vertical" | "horizontal";
  size?: "sm" | "lg";
  ctaLabel?: string;
  ctwaLink?: string;
};

export default function PricingCard({
  title,
  description,
  price,
  type,
  features,
  style = "vertical",
  ctaLabel = "Get Started",
  ctwaLink,
}: PricingCardProps) {
  const isHorizontal = style === "horizontal";

  return (
    <div className="flex flex-col h-full justify-between bg-neutral-900 hover:bg-secondary-600 transition-all duration-200 rounded-2xl p-6 md:p-10 ">
      <div>
        <div className="mb-6 pb-6 border-b border-neutral-500">
          <h3 className="text-body-xl md:text-heading-6 font-semibold mb-3 md:mb-4">
            {title}
          </h3>
          {description && (
            <p className="text-body-sm md:text-body-base font-medium text-neutral-100">
              {description}
            </p>
          )}
        </div>

        <div>
          {price && (
            <div className="mb-4 md:mb-8">
              <strong className="text-heading-6 md:text-heading-4 font-semibold text-white flex items-baseline gap-3">
                {type === "start" && (
                  <span className="text-body-caption font-medium">
                    Start From
                  </span>
                )}
                {price}
                {type === "fixed" && (
                  <span className="text-body-caption md:text-body-lg font-medium">
                    / Project
                  </span>
                )}
              </strong>
            </div>
          )}

          <ul
            className={`space-y-4 ${
              isHorizontal ? "hidden md:grid grid-cols-1 md:grid-cols-2" : ""
            }`}
          >
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-body-sm md:text-body-base"
              >
                <span className="shrink-0 mt-1">
                  <Icon type="check" width={16} height={16} />
                </span>
                <span className="flex-1">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={` ${isHorizontal ? "mt-6 md:mt-8" : "mt-16"}`}>
        <div className="lg:hidden">
          <Button
            as="link"
            href={ctwaLink!}
            target="_blank"
            variant="default"
            size="md"
            color="white"
            fullWidth
            leftIcon
            style="standard"
          >
            {ctaLabel}
          </Button>
        </div>
        <div className="hidden lg:flex">
          <Button
            as="link"
            href={ctwaLink!}
            target="_blank"
            variant="default"
            size="lg"
            color="white"
            fullWidth={!isHorizontal}
            leftIcon
            style="standard"
          >
            {ctaLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
