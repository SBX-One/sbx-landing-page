import Image from "next/image";
import avatar1 from "@/app/_assets/avatar/Ellipse 13.svg";
import avatar2 from "@/app/_assets/avatar/Ellipse 14.svg";
import avatar3 from "@/app/_assets/avatar/Ellipse 15.svg";
import avatar4 from "@/app/_assets/avatar/Ellipse 16.svg";

export default function AvatarStack() {
  return (
    <div className="flex items-center">
      <Image
        src={avatar1}
        alt="Avatar"
        width={24}
        height={24}
        className="size-6 md:size-10 -mr-1 md:-mr-4"
      />
      <Image
        src={avatar2}
        alt="Avatar"
        width={24}
        height={24}
        className="size-6 md:size-10 -mr-1 md:-mr-4"
      />
      <Image
        src={avatar3}
        alt="Avatar"
        width={24}
        height={24}
        className="size-6 md:size-10 -mr-1 md:-mr-4"
      />
      <Image
        src={avatar4}
        alt="Avatar"
        width={24}
        height={24}
        className="size-6 md:size-10 -mr-1 md:-mr-4"
      />
    </div>
  );
}
