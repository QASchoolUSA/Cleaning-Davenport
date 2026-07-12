import type { Metadata } from "next";
import { BookingCalculator } from "@/components/calculator/BookingCalculator";
import { Breadcrumbs } from "@/components/ui";
import { pageTitle } from "@/lib/seo";

export const metadata: Metadata = {
  title: pageTitle("Book Cleaning or Get a Quote"),
  description:
    "Use the Cleaning Davenport booking calculator for instant estimates. Schedule house, deep, Airbnb, or move cleaning in Davenport, FL. Pay after service.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <>
      {/* Mobile: full-screen app quote flow */}
      <div className="md:hidden">
        <BookingCalculator variant="app" />
      </div>

      {/* Desktop / tablet: standard page */}
      <div className="mx-auto hidden max-w-6xl px-4 py-8 sm:px-6 sm:py-16 md:block">
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
        <div className="mt-6 sm:mt-10">
          <BookingCalculator variant="embedded" />
        </div>
      </div>
    </>
  );
}
