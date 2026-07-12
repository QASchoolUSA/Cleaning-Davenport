import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs, CtaBand } from "@/components/ui";
import { galleryImages } from "@/lib/content";
import { pageTitle } from "@/lib/seo";

export const metadata: Metadata = {
  title: pageTitle("Cleaning Gallery"),
  description:
    "See the look and feel of professionally cleaned kitchens, baths, living spaces, and rental turnovers from Cleaning Davenport.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
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
      </div>
      <CtaBand title="Want this feeling at your place?" />
    </>
  );
}
