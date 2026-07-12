import Image from "next/image";
import Link from "next/link";
import { BookingCalculator } from "@/components/calculator/BookingCalculator";
import { QuoteLaunchCard } from "@/components/QuoteLaunchCard";
import { Breadcrumbs, CtaBand, FaqList, SectionHeading } from "@/components/ui";
import type { FrequencyPage } from "@/lib/frequencies";
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

export function FrequencyPageView({ page }: { page: FrequencyPage }) {
  return (
    <>
      <JsonLd
        data={[
          faqJsonLd(page.faqs),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: page.name, path: `/${page.slug}` },
          ]),
        ]}
      />
      <section className="relative min-h-[48vh] overflow-hidden">
        <Image
          src={page.image}
          alt={page.imageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/45 to-charcoal/20" />
        <div className="relative mx-auto flex min-h-[48vh] max-w-6xl flex-col justify-end px-4 pb-12 sm:px-6">
          <Breadcrumbs
            light
            items={[
              { label: "Home", href: "/" },
              { label: page.name },
            ]}
          />
          <h1 className="max-w-3xl font-display text-4xl text-white sm:text-5xl">
            {page.headline}
          </h1>
          {page.discountLabel ? (
            <p className="mt-4 inline-flex w-fit rounded-full bg-coral px-4 py-1.5 text-sm font-semibold text-white">
              {page.discountLabel}
            </p>
          ) : null}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
          <article className="prose-clean">
            {page.longContent.map((p) => (
              <p key={p.slice(0, 28)}>{p}</p>
            ))}
          </article>
          <aside className="rounded-2xl border border-line bg-white p-6">
            <h2 className="font-display text-2xl">Why clients choose this</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {page.benefits.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="text-teal">✓</span>
                  {b}
                </li>
              ))}
            </ul>
            <Link
              href="/book"
              className="mt-6 inline-flex rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-dark"
            >
              Price this schedule
            </Link>
          </aside>
        </div>

        <section className="mt-16">
          <SectionHeading title="FAQ" />
          <FaqList items={page.faqs} />
        </section>

        <section className="mt-16">
          <SectionHeading
            title="Build your estimate"
            description={`${page.name} is ready to select in the calculator.`}
          />
          <div className="md:hidden">
            <QuoteLaunchCard />
          </div>
          <div className="hidden md:block">
            <BookingCalculator defaultFrequency={page.frequencyId} />
          </div>
        </section>
      </div>
      <CtaBand />
    </>
  );
}
