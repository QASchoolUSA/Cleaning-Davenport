import Image from "next/image";
import Link from "next/link";
import { BookingCalculatorServer } from "@/components/calculator/BookingCalculatorServer";
import { QuoteLaunchCard } from "@/components/QuoteLaunchCard";
import { Breadcrumbs, CtaBand, FaqList, SectionHeading } from "@/components/ui";
import { areas } from "@/lib/areas";
import { frequencyPages, type FrequencyPage } from "@/lib/frequencies";
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { services } from "@/lib/services";

export function FrequencyPageView({ page }: { page: FrequencyPage }) {
  const otherSchedules = frequencyPages.filter((f) => f.slug !== page.slug);

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
            <p>
              Not sure which cadence fits Florida humidity? Read{" "}
              <Link href="/blog/how-often-to-clean-florida-humidity">
                how often to clean in Florida humidity
              </Link>
              , or compare{" "}
              <Link href="/services/house-cleaning">house cleaning</Link> and{" "}
              <Link href="/services/maintenance-cleaning">
                maintenance cleaning
              </Link>{" "}
              scopes before you lock a schedule.
            </p>
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
          <SectionHeading
            title="Other schedules"
            description="Switch cadence anytime — discounts update in the calculator."
          />
          <div className="flex flex-wrap gap-3">
            {otherSchedules.map((freq) => (
              <Link
                key={freq.slug}
                href={`/${freq.slug}`}
                className="rounded-full border border-line bg-cream px-4 py-2 text-sm font-medium hover:border-teal hover:bg-teal-light"
              >
                {freq.name}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <SectionHeading title="Pair with a service type" />
          <ul className="flex flex-wrap gap-3">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium hover:border-teal"
                >
                  {service.shortName}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
            {areas.slice(0, 5).map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/areas/${area.slug}`}
                  className="text-teal hover:text-teal-dark"
                >
                  {area.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/service-areas" className="text-teal hover:text-teal-dark">
                All areas →
              </Link>
            </li>
            <li>
              <Link href="/services" className="text-teal hover:text-teal-dark">
                Services hub →
              </Link>
            </li>
          </ul>
        </section>

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
            <BookingCalculatorServer defaultFrequency={page.frequencyId} />
          </div>
        </section>
      </div>
      <CtaBand />
    </>
  );
}
