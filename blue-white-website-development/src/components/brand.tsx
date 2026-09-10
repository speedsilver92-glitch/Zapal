import Link from "next/link";
import Image from "next/image";

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className={`brand${inverse ? " brand-inverse" : ""}`} aria-label="ZAPAL SK home">
      <Image
        className="brand-logo"
        src={inverse ? "/logo-inverse.svg" : "/logo.svg"}
        alt="ZAPAL"
        width={168}
        height={60}
        priority={!inverse}
      />
    </Link>
  );
}
