import type { Metadata } from "next";
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
      </div>
      <CtaBand title="Ready to see for yourself?" />
    </>
  );
}
