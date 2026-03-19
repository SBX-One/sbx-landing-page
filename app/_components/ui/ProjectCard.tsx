import Image, { StaticImageData } from "next/image";
import React from "react";

type ProjectCardProps = {
  image: StaticImageData;
  title: string;
  year: string;
};

export default function ProjectCard({ image, title, year }: ProjectCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="overflow-hidden rounded-2xl mb-3 md:mb-9">
        <Image
          src={image}
          alt={title}
          width={500}
          height={500}
          className="w-full h-87.5 object-cover transform duration-700 ease-out group-hover:scale-110"
        />
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-heading-6 md:text-heading-3 font-medium">
          {title}
        </h1>
        <p className="text-heading-5 md:text-heading-1 font-medium">{year}</p>
      </div>
    </div>
  );
}
