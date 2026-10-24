"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Logo } from "./Logo";
import { useSite } from "./SiteProvider";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const site = useSite();

  return (
    <header className="sticky top-0 z-40 bg-white/70 px-3 pb-3 pt-3 backdrop-blur-xl">
      <div className="header-glass mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-5">
        <Link href="/" aria-label={`${site.brand.name} home`} className="shrink-0">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-1 text-[15px] font-bold tracking-[-0.01em] text-[#0B1730] xl:flex" aria-label="Primary">
          <Dropdown label={site.header.productLabel} items={site.header.product} />
          {site.header.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-[#0B1730] transition hover:bg-white/70"
            >
              {item.label}
            </Link>
          ))}
          <Dropdown label={site.header.resourcesLabel} items={site.header.resources} />
        </nav>
        <div className="hidden items-center gap-3 xl:flex">
          <Link href="/login" className="text-[15px] font-bold text-[#0B1730]">
            {site.header.loginLabel}
          </Link>
          <Link href={site.header.ctaHref} className="btn-primary">
            {site.header.ctaLabel}
          </Link>
        </div>
        <button
          type="button"
          className="rounded-full border border-white/70 bg-white/50 px-3 py-2 text-sm font-semibold xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          Menu
        </button>
      </div>
      {open ? (
        <nav
          id="mobile-nav"
          className="header-glass-panel mx-auto mt-2 grid max-w-7xl gap-2 px-5 py-4 xl:hidden"
          aria-label="Mobile"
        >
          {[...site.header.product, ...site.header.nav, ...site.header.resources, { href: "/login", label: site.header.loginLabel }, { href: site.header.ctaHref, label: site.header.ctaLabel }].map(
            (item) => (
              <Link
                key={`${item.href}-${item.label}`}
                href={item.href}
                className="py-1 font-semibold text-navy"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
      ) : null}
    </header>
  );
}

function Dropdown({ label, items }: { label: string; items: Array<{ href: string; label: string }> }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="rounded-full px-3 py-2 font-bold text-[#0B1730] transition hover:bg-white/70"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
      >
        {label}
      </button>
      {open ? (
        <div id={id} className="absolute left-0 top-full z-20 mt-2 min-w-52 rounded-2xl border border-white/70 bg-white/90 p-2 shadow-glass backdrop-blur-xl">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-xl px-3 py-2 font-medium text-ink hover:bg-pale"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
