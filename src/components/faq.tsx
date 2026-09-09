"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";

export function Faq({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  return <div className="faq-list">{items.map((item, index) => <div className={`faq-item${open === index ? " is-open" : ""}`} key={item.question}><h3><button type="button" id={`${id}-button-${index}`} aria-expanded={open === index} aria-controls={`${id}-panel-${index}`} onClick={() => setOpen(open === index ? null : index)}>{item.question}<Plus size={20} /></button></h3><div id={`${id}-panel-${index}`} role="region" aria-labelledby={`${id}-button-${index}`} hidden={open !== index}><p>{item.answer}</p></div></div>)}</div>;
}
