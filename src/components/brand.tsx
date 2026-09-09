import Link from "next/link";

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className={`brand${inverse ? " brand-inverse" : ""}`} aria-label="ZAPAL SK home">
      <svg className="brand-symbol" width="42" height="42" viewBox="0 0 42 42" fill="none" aria-hidden="true">
        <path d="M11 5H40L31 15H2L11 5Z" fill="currentColor" />
        <path d="M27 12H39L15 37H3L27 12Z" fill="currentColor" />
        <path d="M11 27H39L30 37H2L11 27Z" fill="currentColor" />
      </svg>
      <span className="brand-type"><span className="brand-name">ZAPAL<span className="brand-sk">SK</span></span><span className="brand-tagline">SUPPLY. CONNECT. DELIVER.</span></span>
    </Link>
  );
}
