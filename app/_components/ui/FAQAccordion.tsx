"use client";

import React, { useState } from "react";
import Icon from "./Icon";

interface FAQAccordionProps {
  question: string;
  answer: string;
}

export default function FAQAccordion({ question, answer }: FAQAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`p-6 rounded-xl cursor-pointer transition-colors duration-300 ${
        isOpen ? "bg-zinc-800" : "bg-zinc-900"
      }`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex gap-6 items-center justify-between">
        <h3 className="text-body-lg md:text-heading-6 font-medium">
          {question}
        </h3>
        <div
          className={`shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-135" : "rotate-0"
          }`}
        >
          <Icon type="default" width={24} height={24} />
        </div>
      </div>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-body-sm md:text-body-base font-medium text-zinc-400 pt-6 md:pt-8">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
