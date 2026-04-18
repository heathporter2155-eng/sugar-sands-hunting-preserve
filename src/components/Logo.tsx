import Image from "next/image";

export default function Logo({ className = "", size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "h-12", md: "h-16", lg: "h-24" };
  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/images/logo-sign.png"
        alt="Sugar Sands Hunting Preserve"
        width={540}
        height={364}
        className={`${sizes[size]} w-auto`}
      />
    </div>
  );
}
