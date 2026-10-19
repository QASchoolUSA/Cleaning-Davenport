import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, CtaBand, FaqList } from "@/components/ui";
import { siteFaqs } from "@/lib/content";
import { JsonLd, faqJsonLd, pageTitle } from "@/lib/seo";

export const metadata: Metadata = {
  title: pageTitle("Frequently Asked Questions"),
  description:
    "FAQ for Cleaning Davenport: pricing, recurring schedules, service areas, supplies, access, and paying after cleaning.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(siteFaqs)} />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "FAQ" },
          ]}
        />
        <h1 className="font-display text-4xl text-charcoal sm:text-5xl">
          Frequently asked questions
        </h1>
        <p className="mt-4 text-lg text-muted">
          Straight answers about quotes, schedules, and how Cleaning Davenport
          works. Still stuck?{" "}
          <Link href="/contact" className="font-semibold text-teal">
            Contact us
          </Link>{" "}
          or{" "}
          <Link href="/book" className="font-semibold text-teal">
            run the calculator
          </Link>
          .
        </p>
        <div className="mt-10">
          <FaqList items={siteFaqs} />
        </div>
        <div className="mt-12">
          <h2 className="font-display text-2xl text-charcoal">
            Explore related pages
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
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
              <Link href="/weekly-cleaning" className="text-teal hover:text-teal-dark">
                Weekly cleaning →
              </Link>
            </li>
            <li>
              <Link
                href="/bi-weekly-cleaning"
                className="text-teal hover:text-teal-dark"
              >
                Bi-weekly →
              </Link>
            </li>
            <li>
              <Link href="/monthly-cleaning" className="text-teal hover:text-teal-dark">
                Monthly →
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-teal hover:text-teal-dark">
                Blog →
              </Link>
            </li>
            <li>
              <Link
                href="/blog/how-often-to-clean-florida-humidity"
                className="text-teal hover:text-teal-dark"
              >
                Humidity scheduling guide →
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <CtaBand />
    </>
  );
}
