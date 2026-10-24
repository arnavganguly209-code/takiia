"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";
import { nav } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-pine-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" aria-label="Takiia home">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-parchment-100/80 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-brass-300">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/login" className="text-sm text-parchment-100/80 hover:text-white">
            Sign in
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-copper-500 px-4 py-2 text-sm font-medium text-parchment-50 hover:bg-copper-400"
          >
            Create workspace
          </Link>
        </div>
        <button
          type="button"
          className="rounded-md border border-white/15 px-3 py-2 text-sm lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          Menu
        </button>
      </div>
      {open ? (
        <nav id="mobile-nav" className="grid gap-3 border-t border-white/10 px-5 py-4 lg:hidden" aria-label="Mobile">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link href="/login" onClick={() => setOpen(false)}>
            Sign in
          </Link>
          <Link href="/signup" onClick={() => setOpen(false)}>
            Create workspace
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
