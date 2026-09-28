"use client";

import { useLanguage } from "@/components/language-provider";
import { getContent, type ContentModel } from "./content";

export function useContent(): ContentModel {
  const { locale } = useLanguage();
  return getContent(locale);
}
