import React from "react";

export default function Navigation() {
  return (
    <ul className="hidden lg:flex items-center gap-8">
      <li>
        <a href="#" className="text-body-base font-medium">
          About
        </a>
      </li>
      <li>
        <a href="#" className="text-body-base font-medium">
          Expertise
        </a>
      </li>
      <li>
        <a href="#" className="text-body-base font-medium">
          Project
        </a>
      </li>
      <li>
        <a href="#" className="text-body-base font-medium">
          Pricing
        </a>
      </li>
      <li>
        <a href="#" className="text-body-base font-medium">
          FAQ
        </a>
      </li>
      <li>
        <a href="#" className="text-body-base font-medium">
          Testimonials
        </a>
      </li>
    </ul>
  );
}
