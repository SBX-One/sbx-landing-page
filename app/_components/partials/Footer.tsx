import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";
import Button from "../ui/Button";
import Tag from "../ui/Tag";
import Icon from "../ui/Icon";
import Selector from "../ui/Selector";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="px-4 md:px-8 lg:px-14 py-6 md:py-6 lg:py-8 bg-neutral-900 min-h-[85vh] ">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 lg:mb-24">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-4 mb-6">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={999}
              height={999}
              className="w-12 md:w-8 lg:w-12"
            />
            <strong className="text-'body'-lg md:text-body-xl lg:text-heading-6 font-semibold">
              SBX One Studio
            </strong>
          </div>
          <div>
            <div className="flex flex-col gap-8 mb-9">
              <h1
                dangerouslySetInnerHTML={{ __html: t("title") }}
                className="text-heading-3 md:text-heading-2 lg:text-heading-1 font-semibold"
              />
              <p
                dangerouslySetInnerHTML={{ __html: t("description") }}
                className="text-body-base font-medium"
              />
              <Button
                variant="default"
                size="md"
                color="primary"
                leftIcon={true}
                style="standard"
                className="w-fit"
              >
                {t("cta")}
              </Button>
            </div>
            <div className="text-neutral-50">
              <address className="text-body-base font-medium not-italic ">
                labs.sharkbyte@gmail.com
              </address>
              <address className="text-body-sm font-medium opacity-80 not-italic">
                Based in Bali, Indonesia
              </address>
            </div>
          </div>
        </div>
        <div className="hidden lg:block"></div>
        <div className="lg:col-span-6">
          <ul>
            {[
              { id: "01", label: "About" },
              { id: "02", label: "Projects" },
              { id: "03", label: "Pricing" },
            ].map((item, index) => (
              <li key={index}>
                <span className="hidden md:block">
                  <Selector number={item.id} label={item.label} size="md" />
                </span>
                <span className="md:hidden">
                  <Selector number={item.id} label={item.label} size="sm" />
                </span>
              </li>
            ))}
            <li className="flex items-center justify-between py-8 border-b border-neutral-500">
              <div className="flex items-center gap-5">
                <span className="hidden lg:block text-pixel-sm md:text-pixel-base">
                  [ 04 ]
                </span>
                <ul className="flex gap-1">
                  {[
                    { label: "Instagram", href: "#" },
                    { label: "Dribble", href: "#" },
                    { label: "Behance", href: "#" },
                  ].map((item, index) => (
                    <li key={index}>
                      <Tag as="link" style="pixel" size="sm" href={item.href}>
                        {item.label}
                      </Tag>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <strong className="text-body-sm font-medium text-neutral-400 text-center block">
        @ 2025 SBX One. All rights reserved
      </strong>
    </footer>
  );
}
