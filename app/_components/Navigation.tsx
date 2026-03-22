import React from "react";

export default function Navigation() {
  return (
    <ul className="hidden lg:flex items-center gap-8">
      <li>
        <a href="#about" className="text-body-base font-medium">
          About
        </a>
      </li>
      <li>
        <a href="#expertise" className="text-body-base font-medium">
          Expertise
        </a>
      </li>
      <li>
        <a href="#projects" className="text-body-base font-medium">
          Project
        </a>
      </li>
      <li>
        <a href="#pricing" className="text-body-base font-medium">
          Pricing
        </a>
      </li>
      <li>
        <a href="#faq" className="text-body-base font-medium">
          FAQ
        </a>
      </li>
      <li>
        <a href="#testimonials" className="text-body-base font-medium">
          Testimonials
        </a>
      </li>
    </ul>
  );
}
