"use client";

import Link from "next/link";
import { MessageSquareText } from "lucide-react";
import { useLanguage } from "./language-provider";

export function FloatingContact() {
  const { t } = useLanguage();
  return (
    <Link href="/contacts#enquiry-form" className="floating-contact" aria-label={t.floatingCta}>
      <MessageSquareText size={23} strokeWidth={1.7} />
      <span>{t.floatingCta}</span>
    </Link>
  );
}
