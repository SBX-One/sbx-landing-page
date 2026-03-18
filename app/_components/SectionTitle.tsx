import React from "react";

export default function SectionTitle({ title }: { title: string }) {
  return (
    <strong className="text-pixel-sm md:text-pixel-base">[ {title} ]</strong>
  );
}
