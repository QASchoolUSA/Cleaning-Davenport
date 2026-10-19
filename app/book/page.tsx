import type { Metadata } from "next";
import Link from "next/link";
import { BookingCalculatorServer } from "@/components/calculator/BookingCalculatorServer";
import { Breadcrumbs } from "@/components/ui";
import { areas } from "@/lib/areas";
import { pageTitle } from "@/lib/seo";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: pageTitle("Book Cleaning or Get a Quote"),
  description:
    "Use the Cleaning Davenport booking calculator for instant estimates. Schedule house, deep, Airbnb, or move cleaning in Davenport, FL. Pay after service.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Book / Quote" },
          ]}
        />
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">
          No upfront payment
        </p>
        <h1 className="mt-2 max-w-3xl font-display text-3xl text-charcoal sm:text-5xl">
          Get your cleaning quote — or request a booking
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted sm:mt-4 sm:text-lg">
          Pricing from square footage, bedrooms, bathrooms, frequency, and
          add-ons. Pay after the cleaning is done.
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          Choose the service that matches the job — house or apartment for
          routine visits, deep or move-out when detail work matters, Airbnb for
          turnovers, maintenance for recurring upkeep, or post-construction after
          renovations. Then pick one-time, weekly, bi-weekly, or monthly.
          Recurring plans show schedule discounts in the estimate. Prefer to
          read first? Browse{" "}
          <Link href="/services" className="font-semibold text-teal">
            services
          </Link>
          ,{" "}
          <Link href="/service-areas" className="font-semibold text-teal">
            service areas
          </Link>
          , or{" "}
          <Link href="/about" className="font-semibold text-teal">
            about
          </Link>
          .
        </p>
        <div className="mt-6 space-y-3">
          <ul className="flex flex-wrap gap-x-3 gap-y-2 text-sm font-medium">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-teal hover:text-teal-dark"
                >
                  {service.shortName}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-x-3 gap-y-2 text-sm font-medium">
            <li>
              <Link href="/one-time-cleaning" className="text-teal hover:text-teal-dark">
                One-time
              </Link>
            </li>
            <li>
              <Link href="/weekly-cleaning" className="text-teal hover:text-teal-dark">
                Weekly
              </Link>
            </li>
            <li>
              <Link href="/bi-weekly-cleaning" className="text-teal hover:text-teal-dark">
                Bi-weekly
              </Link>
            </li>
            <li>
              <Link href="/monthly-cleaning" className="text-teal hover:text-teal-dark">
                Monthly
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-teal hover:text-teal-dark">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="text-teal hover:text-teal-dark">
                Gallery
              </Link>
            </li>
          </ul>
          <ul className="flex flex-wrap gap-x-3 gap-y-2 text-sm font-medium">
            {areas.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/areas/${area.slug}`}
                  className="text-teal hover:text-teal-dark"
                >
                  {area.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile: full-screen app quote flow */}
      <div className="md:hidden">
        <BookingCalculatorServer variant="app" />
      </div>

      {/* Desktop / tablet: standard page */}
      <div className="mx-auto hidden max-w-6xl px-4 pb-8 sm:px-6 sm:pb-16 md:block">
        <div className="mt-6 sm:mt-10">
          <BookingCalculatorServer variant="embedded" />
        </div>
      </div>
    </>
  );
}
