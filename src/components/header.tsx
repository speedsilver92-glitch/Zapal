"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Cable, ChevronDown, Cpu, Globe2, Menu, X, Zap } from "lucide-react";
import { Brand } from "./brand";
import { LanguageSwitcher } from "./language-switcher";
import { useLanguage } from "./language-provider";
import { useContent } from "@/lib/use-content";

export function Header() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { materialCategories } = useContent();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [materialsOpen, setMaterialsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const icons = [Zap, Cable, Cpu];
  const categoryLabels = materialCategories.map((category) => category.title);

  const navigation = [
    { label: t.nav.materials, mobileLabel: t.nav.materials, href: "/materials" },
    { label: t.nav.supplyChain, mobileLabel: t.nav.supplyChainFull, href: "/supply-chain" },
    { label: t.nav.logistics, mobileLabel: t.nav.logisticsFull, href: "/logistics" },
    { label: t.nav.about, mobileLabel: t.nav.about, href: "/about" },
    { label: t.nav.partners, mobileLabel: t.nav.partners, href: "/partners" },
    { label: t.nav.contacts, mobileLabel: t.nav.contacts, href: "/contacts" },
  ];

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMaterialsOpen(false);
        if (mobileOpen) { setMobileOpen(false); menuButton.current?.focus(); }
      }
    }
    function onOutside(event: PointerEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMaterialsOpen(false); setMobileOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutside);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onOutside); };
  }, [mobileOpen]);

  const closeMenus = () => { setMobileOpen(false); setMaterialsOpen(false); };

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`} ref={headerRef}>
      <a className="skip-link" href="#main-content">{t.skip}</a>
      <div className="utility-bar"><div className="container utility-inner"><span className="utility-tag"><span className="status-dot" />{t.utilityTag}</span><div className="utility-right"><span className="utility-location"><Globe2 size={13} strokeWidth={1.5} />{t.utilityLocation}</span><LanguageSwitcher /></div></div></div>
      <div className="container nav-inner">
        <div onClick={closeMenus}><Brand /></div>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item, index) => index === 0 ? (
            <div key={item.href} className="nav-dropdown" onMouseEnter={() => setMaterialsOpen(true)} onMouseLeave={() => setMaterialsOpen(false)}>
              <div className={`nav-materials${pathname.startsWith(item.href) ? " active" : ""}`}>
                <Link className="nav-link" href={item.href} onClick={closeMenus} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>
                <button type="button" className="dropdown-toggle" aria-label={t.showMaterials} aria-expanded={materialsOpen} aria-controls="materials-menu" onClick={() => setMaterialsOpen(!materialsOpen)}><ChevronDown size={13} className={materialsOpen ? "rotated" : ""} /></button>
              </div>
              {materialsOpen && <div id="materials-menu" className="materials-menu"><p className="menu-eyebrow">{t.materialsMenuTitle}</p>{materialCategories.map((category, categoryIndex) => { const Icon = icons[categoryIndex]; return <Link href={`/materials/${category.slug}`} key={category.slug} onClick={closeMenus}><span className="menu-icon"><Icon size={19} /></span><span>{categoryLabels[categoryIndex]}</span><ArrowUpRight size={15} /></Link>; })}<Link href="/materials" className="menu-all" onClick={closeMenus}>{t.exploreAllMaterials} <ArrowUpRight size={15} /></Link></div>}
            </div>
          ) : <Link key={item.href} className={`nav-link${pathname === item.href ? " active" : ""}`} href={item.href} onClick={closeMenus} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>)}
        </nav>
        <Link href="/contacts" className="button button-blue nav-cta" onClick={closeMenus}>{t.navCta} <ArrowUpRight size={17} /></Link>
        <button ref={menuButton} type="button" className="mobile-menu-button" aria-label={mobileOpen ? t.closeNav : t.openNav} aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X size={25} /> : <Menu size={25} />}</button>
      </div>
      {mobileOpen && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{navigation.map(item => <div key={item.href}><Link href={item.href} onClick={closeMenus} aria-current={pathname === item.href ? "page" : undefined}>{item.mobileLabel}<ArrowUpRight size={18} /></Link>{item.href === "/materials" && <div className="mobile-subnav">{materialCategories.map((category, categoryIndex) => <Link href={`/materials/${category.slug}`} key={category.slug} onClick={closeMenus}>{categoryLabels[categoryIndex]}</Link>)}</div>}</div>)}<Link href="/contacts" className="button button-blue" onClick={closeMenus}>{t.mobileCta} <ArrowUpRight size={18} /></Link></nav>}
    </header>
  );
}
