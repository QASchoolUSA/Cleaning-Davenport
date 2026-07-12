"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileStickyCta } from "@/components/MobileStickyCta";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isBookApp = pathname === "/book";

  useEffect(() => {
    if (!isBookApp) return;
    const mq = window.matchMedia("(max-width: 767px)");
    const lock = () => {
      if (mq.matches) {
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
      } else {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      }
    };
    lock();
    mq.addEventListener("change", lock);
    return () => {
      mq.removeEventListener("change", lock);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isBookApp]);

  return (
    <>
      <div className={isBookApp ? "hidden md:block" : undefined}>
        <Header />
      </div>
      <main
        className={
          isBookApp
            ? "flex min-h-0 flex-1 flex-col overflow-hidden md:overflow-visible md:pb-0"
            : "flex-1 pb-24 md:pb-0"
        }
      >
        {children}
      </main>
      <div className={isBookApp ? "hidden md:block" : undefined}>
        <Footer />
      </div>
      {!isBookApp ? <MobileStickyCta /> : null}
    </>
  );
}
