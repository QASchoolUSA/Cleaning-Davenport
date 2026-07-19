import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs, CtaBand, SectionHeading } from "@/components/ui";
import { pageTitle } from "@/lib/seo";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: pageTitle("Our Cleaning Services"),
  description:
    "Explore house, apartment, Airbnb, move-in/out, deep, maintenance, and post-construction cleaning services from Cleaning Davenport.",
  alternates: { canonical: "/services" },
};

export default function ServicesHubPage() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services" },
          ]}
        />
        <h1 className="font-display text-4xl text-charcoal sm:text-5xl">
          Cleaning services in Davenport, FL
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Every service has its own checklist and pricing baseline. Pick the
          one that matches your home — then fine-tune square footage, rooms, and
          add-ons in the calculator.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group overflow-hidden rounded-[1.5rem] border border-line bg-white transition hover:shadow-md"
            >
              <div className="relative h-52">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <h2 className="font-display text-2xl text-charcoal">
                  {service.shortName}
                </h2>
                <p className="mt-2 text-sm text-muted">{service.description}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-teal">
                  Learn more →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16">
          <SectionHeading
            title="Also browse by schedule"
            description="One-time visits or recurring plans with automatic discounts."
          />
          <div className="flex flex-wrap gap-3">
            {[
              ["/one-time-cleaning", "One-time"],
              ["/weekly-cleaning", "Weekly"],
              ["/bi-weekly-cleaning", "Bi-weekly"],
              ["/monthly-cleaning", "Monthly"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="rounded-full border border-line bg-cream px-4 py-2 text-sm font-medium hover:border-teal hover:bg-teal-light"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <CtaBand />
    </>
  );
}
