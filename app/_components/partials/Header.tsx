import Image from "next/image";
import React from "react";
import LanguageToggle from "../LanguageToggle";
import MobileMenu from "../MobileMenu";

export default function Header() {
  return (
    <header className="p-4 py-5 border border-neutral-600 ">
      <div className="flex items-center justify-between">
        <a href="#" className="flex items-center gap-4">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={999}
            height={999}
            className="w-6"
          />
          <span className="text-lg font-semibold">SBXOne</span>
        </a>
        <div className="flex gap-6">
          <LanguageToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
