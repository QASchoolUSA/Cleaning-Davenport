import Link from "next/link";
import { services } from "@/lib/services";
import { areas } from "@/lib/areas";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-charcoal text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <p className="font-display text-2xl text-white">{siteConfig.name}</p>
          <p className="text-sm leading-relaxed text-white/70">
            Professional cleaning across Davenport, FL and nearby Central
            Florida communities. Clear online quotes. Pay after cleaning.
          </p>
          <p className="text-sm text-white/80">
            <a
              className="underline decoration-white/30 underline-offset-4 hover:decoration-white"
              href={`mailto:${siteConfig.email}`}
            >
              {siteConfig.email}
            </a>
          </p>
          <p className="text-sm text-white/60">Davenport, FL</p>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
            Services
          </p>
          <ul className="space-y-2 text-sm text-white/75">
            {services.map((s) => (
              <li key={s.slug}>
                <Link className="hover:text-white" href={`/services/${s.slug}`}>
                  {s.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
            Areas
          </p>
          <ul className="space-y-2 text-sm text-white/75">
            {areas.map((a) => (
              <li key={a.slug}>
                <Link className="hover:text-white" href={`/areas/${a.slug}`}>
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
            Company
          </p>
          <ul className="space-y-2 text-sm text-white/75">
            <li>
              <Link className="hover:text-white" href="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/pricing">
                Pricing
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/blog">
                Blog
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/faq">
                FAQ
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/contact">
                Contact
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/privacy">
                Privacy
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/terms">
                Terms
              </Link>
            </li>
          </ul>
          <Link
            href="/book"
            className="mt-6 inline-flex rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-white hover:bg-coral-dark"
          >
            Get your quote
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/45 sm:px-6">
        © {new Date().getFullYear()} {siteConfig.name}. Serving{" "}
        {siteConfig.serviceAreaLabel}.
      </div>
    </footer>
  );
}
