import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs, CtaBand, FaqList } from "@/components/ui";
import { galleryImages } from "@/lib/content";
import { JsonLd, breadcrumbJsonLd, faqJsonLd, pageTitle } from "@/lib/seo";

export const metadata: Metadata = {
  title: pageTitle("Cleaning Gallery"),
  description:
    "See the look and feel of professionally cleaned kitchens, baths, living spaces, and rental turnovers from Cleaning Davenport.",
  alternates: { canonical: "/gallery" },
};

const galleryFaqs = [
  {
    question: "Are these photos from Davenport homes?",
    answer:
      "They represent the atmosphere of kitchens, baths, living rooms, and rental resets we clean around Davenport and nearby Central Florida. Client photo swaps continue as the portfolio grows.",
  },
  {
    question: "Which services produce results like these?",
    answer:
      "House, deep, Airbnb turnover, and move-out cleans are the most common paths. Browse Services or open the booking calculator for a quote on your home.",
  },
  {
    question: "Can I book after browsing the gallery?",
    answer:
      "Yes. Use Get a quote to build an estimate online—no upfront payment. You pay after the cleaning is done.",
  },
];

export default function GalleryPage() {
  return (
    <>
      <JsonLd
        data={[
          faqJsonLd(galleryFaqs),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Gallery", path: "/gallery" },
          ]),
        ]}
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Gallery" },
          ]}
        />
        <h1 className="font-display text-4xl text-charcoal sm:text-5xl">
          Clean spaces, real atmosphere
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          A look at the kinds of kitchens, baths, living rooms, and rental
          resets we work on every week around Davenport. Client photo swaps
          coming as the portfolio grows.
        </p>
        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {galleryImages.map((img) => (
            <figure
              key={img.src}
              className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-line bg-white"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <figcaption className="px-4 py-3 text-sm font-medium text-muted">
                {img.label}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
          <Link href="/services" className="text-teal hover:text-teal-dark">
            Browse services →
          </Link>
          <Link href="/about" className="text-teal hover:text-teal-dark">
            About us →
          </Link>
          <Link href="/blog" className="text-teal hover:text-teal-dark">
            Cleaning tips →
          </Link>
          <Link href="/book" className="text-coral hover:text-coral-dark">
            Get a quote →
          </Link>
        </div>

        <div className="mt-14">
          <h2 className="font-display text-3xl text-charcoal">Gallery FAQ</h2>
          <div className="mt-6">
            <FaqList items={galleryFaqs} />
          </div>
        </div>
      </div>
      <CtaBand title="Want this feeling at your place?" />
    </>
  );
}
