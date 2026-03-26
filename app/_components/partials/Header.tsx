import Image from "next/image";
import React from "react";
import LanguageToggle from "../LanguageToggle";
import MobileMenu from "../MobileMenu";
import Button from "../ui/Button";
import Navigation from "../Navigation";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("Header");

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-background/90 lg:bg-background/40 lg:backdrop-blur-md px-4 md:px-8 lg:px-14 py-5 md:py-6 lg:py-8 border-b border-neutral-600 ">
      <div className="flex items-center justify-between 2xl:container mx-auto">
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center gap-4">
            <Image
              src="/logo.svg"
              alt="SBX One Studio Logo"
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
              href={t("cta-link")}
              as="link"
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
