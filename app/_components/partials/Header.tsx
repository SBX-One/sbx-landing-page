import Image from "next/image";
import React from "react";
import LanguageToggle from "../LanguageToggle";
import MobileMenu from "../MobileMenu";
import Button from "../ui/Button";
import Navigation from "../Navigation";

export default function Header() {
  return (
    <header className="px-4 md:px-8 lg:px-14 py-5 md:py-6 lg:py-8 border-b border-neutral-600 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center gap-4">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={999}
              height={999}
              className="w-6 md:w-8 lg:w-12"
            />
            <strong className="text-body-lg md:text-body-xl lg:text-heading-6 font-semibold">
              SBXOne
            </strong>
          </a>
          <span className="hidden lg:block">|</span>
          <Navigation />
        </div>
        <div className="flex items-center gap-6">
          <LanguageToggle />
          <div className="hidden lg:block">
            <Button
              variant="default"
              size="lg"
              color="white"
              leftIcon={true}
              style="pill"
            >
              Start a Project
            </Button>
          </div>
          <div className="lg:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
