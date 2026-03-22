import React from "react";
import { FaStar } from "react-icons/fa6";

interface SocialProofProps {
  name?: string;
  role?: string;
  text?: string;
  stars?: number;
}

export default function SocialProof({
  name = "Andra Divano",
  role = "CEO at Atrem Project",
  text = "Going last sexy read accountable back six. Didn't productize game responsible pole my churning post email elephant. Expectations charts angel 30,000ft dive. Agile hear quick disband donuts.",
  stars = 5,
}: SocialProofProps) {
  return (
    <div className="p-6 bg-zinc-900 flex flex-col justify-between h-80 lg:w-md rounded-2xl">
      <div>
        <div className="flex items-center gap-1 text-yellow-400 mb-4 md:text-xl">
          {Array.from({ length: stars }).map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>
        <p className="text-body-sm md:text-body-base font-medium">{text}</p>
      </div>
      <div>
        <p className="text-body-sm md:text-body-base font-medium">{name}</p>
        <p className="text-body-sm md:text-body-base font-medium text-neutral-400">
          {role}
        </p>
      </div>
    </div>
  );
}
