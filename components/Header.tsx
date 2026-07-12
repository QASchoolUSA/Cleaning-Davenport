"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, siteConfig } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);

  if (menuPath !== pathname) {
    setMenuPath(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line/80 bg-cream/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="group flex flex-col leading-tight">
          <span className="font-display text-xl text-teal transition group-hover:text-teal-dark sm:text-2xl">
            {siteConfig.name}
          </span>
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
            Davenport, FL
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-teal-light text-teal-dark"
                    : "text-charcoal/80 hover:bg-teal-light/70 hover:text-teal"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/book"
            className="hidden rounded-full bg-coral px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-coral-dark sm:inline-flex"
          >
            Get a quote
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/80 text-charcoal lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <div className="flex w-5 flex-col gap-1.5">
              <span
                className={`h-0.5 w-full bg-charcoal transition ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`h-0.5 w-full bg-charcoal transition ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`h-0.5 w-full bg-charcoal transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-cream/95 px-4 py-4 backdrop-blur-md lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-3 py-3 text-base font-medium text-charcoal hover:bg-teal-light"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book"
              className="mt-2 rounded-full bg-coral px-4 py-3 text-center text-base font-semibold text-white"
            >
              Get a quote / Book
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
