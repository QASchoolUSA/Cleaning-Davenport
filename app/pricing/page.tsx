import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, CtaBand, SectionHeading } from "@/components/ui";
import {
  ADDON_META,
  addOnPrices,
  formatUSD,
  frequencyDiscountLabels,
  frequencyLabels,
  minimumBase,
  type AddonId,
  type FrequencyId,
  type ServiceTypeId,
} from "@/lib/pricing";
import { getPricingConfig } from "@/lib/pricing-config";
import { pageTitle } from "@/lib/seo";
import { getServiceById, services } from "@/lib/services";

/** Order the starting-price table reads best in, cheapest tiers first. */
const STARTING_POINT_ORDER: ServiceTypeId[] = [
  "house",
  "apartment",
  "maintenance",
  "deep",
  "airbnb",
  "move",
  "post-construction",
];

export const metadata: Metadata = {
  title: pageTitle("Cleaning Prices in Davenport, FL"),
  description:
    "See how Cleaning Davenport pricing works: square footage, bedrooms, bathrooms, frequency discounts, and add-ons. Instant online estimates. Pay after cleaning.",
  alternates: { canonical: "/pricing" },
};

export default async function PricingPage() {
  const config = await getPricingConfig();
  const FREQUENCY_LABELS = frequencyLabels(config);
  const FREQUENCY_DISCOUNT_LABELS = frequencyDiscountLabels(config);
  const ADDON_PRICES = addOnPrices(config);
  const startingPoints = STARTING_POINT_ORDER.map((id) => ({
    id,
    name: getServiceById(id)?.shortName ?? id,
    price: minimumBase(config)[id],
  }));

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Pricing" },
          ]}
        />
        <h1 className="font-display text-4xl text-charcoal sm:text-5xl">
          Straightforward cleaning prices in Davenport
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          No mystery phone quotes. Your estimate is built from home size, rooms,
          how often you clean, and the extras you actually want. Payment is
          always after the service — never required to book.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Size + rooms",
              text: "Base pricing starts from square footage and service type, then adds bedroom and bathroom rates.",
            },
            {
              title: "Frequency discounts",
              text: "Weekly, bi-weekly, and monthly plans cost less per visit than repeating one-time rates.",
            },
            {
              title: "Optional add-ons",
              text: "Oven, fridge, windows, cabinets, and more — only when you need them.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-line bg-white p-6"
            >
              <h2 className="font-display text-2xl">{card.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {card.text}
              </p>
            </div>
          ))}
        </div>

        <section className="mt-16">
          <SectionHeading
            title="Example starting points"
            description="These are ballpark floors before bedrooms, bathrooms, and add-ons. Use the calculator for your exact home."
          />
          <div className="overflow-x-auto rounded-2xl border border-line bg-white">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-teal-light/60 text-charcoal">
                <tr>
                  <th className="px-4 py-3 font-semibold">Service</th>
                  <th className="px-4 py-3 font-semibold">From</th>
                </tr>
              </thead>
              <tbody>
                {startingPoints.map((row) => (
                  <tr key={row.id} className="border-t border-line">
                    <td className="px-4 py-3">{row.name}</td>
                    <td className="px-4 py-3 font-semibold text-teal">
                      {formatUSD(row.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-16 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl">Recurring savings</h2>
            <ul className="mt-5 space-y-3">
              {(Object.keys(FREQUENCY_LABELS) as FrequencyId[]).map(
                (id) => (
                  <li
                    key={id}
                    className="flex items-center justify-between rounded-xl border border-line bg-white px-4 py-3 text-sm"
                  >
                    <span>{FREQUENCY_LABELS[id]}</span>
                    <span className="font-semibold text-coral-dark">
                      {FREQUENCY_DISCOUNT_LABELS[id] ?? "Standard rate"}
                    </span>
                  </li>
                ),
              )}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-3xl">Popular add-ons</h2>
            <ul className="mt-5 space-y-3">
              {(Object.keys(ADDON_META) as AddonId[])
                .slice(0, 6)
                .map((id) => (
                  <li
                    key={id}
                    className="flex items-center justify-between rounded-xl border border-line bg-white px-4 py-3 text-sm"
                  >
                    <span>{ADDON_META[id].label}</span>
                    <span className="font-semibold text-teal">
                      {formatUSD(ADDON_PRICES[id])}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-3xl">Explore services</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium hover:border-teal hover:bg-teal-light"
              >
                {s.shortName}
              </Link>
            ))}
          </div>
          <Link
            href="/book"
            className="mt-8 inline-flex rounded-full bg-coral px-6 py-3 text-sm font-semibold text-white hover:bg-coral-dark"
          >
            Open the pricing calculator
          </Link>
        </section>
      </div>
      <CtaBand
        title="Curious what your home costs?"
        description="Run the calculator with your square footage and room counts — it takes about two minutes."
      />
    </>
  );
}
