"use client";

import Image from "next/image";
import idFlag from "@/app/_assets/id.png";
import enFlag from "@/app/_assets/en.png";
import { IoChevronDownSharp } from "react-icons/io5";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { useState, useTransition } from "react";

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const locales = [
    { code: "id", name: "ID", flag: idFlag },
    { code: "en", name: "EN", flag: enFlag },
  ];

  const currentLocale = locales.find((l) => l.code === locale) || locales[0];

  function onSelectChange(nextLocale: string) {
    if (nextLocale === locale) {
      setIsOpen(false);
      return;
    }

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="flex items-center gap-3 focus:outline-none"
      >
        <span className="flex items-center gap-2 font-semibold">
          <Image
            src={currentLocale.flag}
            alt={currentLocale.name}
            width={20}
            height={20}
            className="size-4 object-contain"
          />
          {currentLocale.name}
        </span>
        <IoChevronDownSharp
          className={`text-lg transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <>
          {/* Overlay to close dropdown when clicking outside */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="absolute right-0 mt-3 py-2 w-32 bg-neutral-950 border border-neutral-800 rounded-xl shadow-2xl z-50 animate-in fade-in zoom-in duration-200">
            {locales.map((l) => (
              <button
                key={l.code}
                onClick={() => onSelectChange(l.code)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-neutral-800 transition-colors ${
                  locale === l.code
                    ? "text-primary-400 font-bold"
                    : "text-neutral-400"
                }`}
              >
                <Image
                  src={l.flag}
                  alt={l.name}
                  width={20}
                  height={20}
                  className="size-4 object-contain"
                />
                {l.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
