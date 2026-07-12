"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileStickyCta() {
  const pathname = usePathname();
  if (pathname === "/book") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 p-3 backdrop-blur-md md:hidden">
      <Link
        href="/book"
        className="flex w-full items-center justify-center rounded-full bg-coral py-3.5 text-sm font-semibold text-white shadow-lg shadow-coral/25"
      >
        Get a free quote — pay after cleaning
      </Link>
    </div>
  );
}
