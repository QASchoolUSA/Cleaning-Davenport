import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, CtaBand, ReviewCard } from "@/components/ui";
import { reviews } from "@/lib/content";
import { pageTitle } from "@/lib/seo";

export const metadata: Metadata = {
  title: pageTitle("Customer Reviews"),
  description:
    "Read what Davenport, Champions Gate, and Central Florida clients say about Cleaning Davenport — clear quotes, reliable cleans, pay after service.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Reviews" },
          ]}
        />
        <h1 className="font-display text-4xl text-charcoal sm:text-5xl">
          Reviews from nearby homes and hosts
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          A sampling of feedback from clients across Davenport and surrounding
          communities. Real Google review embeds can be added once the business
          profile is linked.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <ReviewCard key={r.name} {...r} />
          ))}
        </div>
        <ul className="mt-12 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
          <li>
            <Link href="/services" className="text-teal hover:text-teal-dark">
              Services →
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-teal hover:text-teal-dark">
              About →
            </Link>
          </li>
          <li>
            <Link href="/gallery" className="text-teal hover:text-teal-dark">
              Gallery →
            </Link>
          </li>
          <li>
            <Link href="/service-areas" className="text-teal hover:text-teal-dark">
              Service areas →
            </Link>
          </li>
          <li>
            <Link href="/areas/davenport-fl" className="text-teal hover:text-teal-dark">
              Davenport →
            </Link>
          </li>
          <li>
            <Link href="/areas/champions-gate" className="text-teal hover:text-teal-dark">
              Champions Gate →
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-teal hover:text-teal-dark">
              Contact →
            </Link>
          </li>
          <li>
            <Link href="/book" className="text-coral hover:text-coral-dark">
              Get a quote →
            </Link>
          </li>
        </ul>
      </div>
      <CtaBand title="Ready to see for yourself?" />
    </>
  );
}
