"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe2 } from "lucide-react";
import { locales, localeMeta, type Locale } from "@/lib/i18n";
import { useLanguage } from "./language-provider";

function Flag({ locale }: { locale: Locale }) {
  if (locale === "sk") return (
    <svg className="lang-flag" viewBox="0 0 24 16" aria-hidden="true"><rect width="24" height="16" fill="#fff" /><rect width="24" height="5.33" fill="#ee1c25" y="10.67" /><rect width="24" height="5.34" fill="#0b4ea2" y="5.33" /></svg>
  );
  if (locale === "cs") return (
    <svg className="lang-flag" viewBox="0 0 24 16" aria-hidden="true"><rect width="24" height="8" fill="#fff" /><rect width="24" height="8" y="8" fill="#d7141a" /><path d="M0 0 L12 8 L0 16 Z" fill="#11457e" /></svg>
  );
  if (locale === "uk") return (
    <svg className="lang-flag" viewBox="0 0 24 16" aria-hidden="true"><rect width="24" height="8" fill="#0057b7" /><rect width="24" height="8" y="8" fill="#ffd700" /></svg>
  );
  return (
    <svg className="lang-flag" viewBox="0 0 24 16" aria-hidden="true"><rect width="24" height="16" fill="#012169" /><path d="M0 0 L24 16 M24 0 L0 16" stroke="#fff" strokeWidth="3.2" /><path d="M0 0 L24 16 M24 0 L0 16" stroke="#c8102e" strokeWidth="1.8" /><path d="M12 0 V16 M0 8 H24" stroke="#fff" strokeWidth="5.2" /><path d="M12 0 V16 M0 8 H24" stroke="#c8102e" strokeWidth="3" /></svg>
  );
}

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onPointer(event: PointerEvent) {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape" && open) { setOpen(false); buttonRef.current?.focus(); }
    }
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onPointer); document.removeEventListener("keydown", onKey); };
  }, [open]);

  function choose(next: Locale) {
    setLocale(next);
    setOpen(false);
    buttonRef.current?.focus();
  }

  return (
    <div className="lang-switcher" ref={wrapRef}>
      <button
        ref={buttonRef}
        type="button"
        className="lang-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${t.languageLabel}: ${localeMeta[locale].name}`}
        onClick={() => setOpen(!open)}
      >
        <Globe2 size={13} strokeWidth={1.7} className="lang-globe" />
        <Flag locale={locale} />
        <span className="lang-code">{localeMeta[locale].short}</span>
        <ChevronDown size={12} className={`lang-caret${open ? " open" : ""}`} />
      </button>
      {open && (
        <ul className="lang-menu" role="listbox" aria-label={t.chooseLanguage}>
          {locales.map((item) => (
            <li key={item} role="option" aria-selected={item === locale}>
              <button type="button" className={item === locale ? "selected" : ""} onClick={() => choose(item)}>
                <Flag locale={item} />
                <span className="lang-name">{localeMeta[item].label}</span>
                <span className="lang-short">{localeMeta[item].short}</span>
                {item === locale && <Check size={14} className="lang-check" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
