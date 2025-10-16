import Image from "next/image";
import goldLine from "@/images/Gold Line.png";

export default function SectionDivider() {
  return (
    <div className="relative w-full h-[10px] overflow-hidden m-0 p-0">
      <Image
        src={goldLine}
        alt="Section divider"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}
