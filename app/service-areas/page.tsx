import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs, CtaBand } from "@/components/ui";
import { areas } from "@/lib/areas";
import { pageTitle } from "@/lib/seo";

export const metadata: Metadata = {
  title: pageTitle("Service Areas"),
  description:
    "Cleaning Davenport serves Davenport, FL plus Champions Gate, Posner Park, Four Corners, Haines City, Kissimmee, and Winter Haven.",
  alternates: { canonical: "/service-areas" },
};

export default function ServiceAreasPage() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Service Areas" },
          ]}
        />
        <h1 className="font-display text-4xl text-charcoal sm:text-5xl">
          Where we clean in Central Florida
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Davenport is home base. These nearby communities are on our regular
          routes — request a quote with your ZIP to confirm timing.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {areas.map((area) => (
            <Link
              key={area.slug}
              href={`/areas/${area.slug}`}
              className="group overflow-hidden rounded-[1.5rem] border border-line bg-white hover:shadow-md"
            >
              <div className="relative h-48">
                <Image
                  src={area.image}
                  alt={area.imageAlt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <h2 className="font-display text-2xl">{area.name}</h2>
                <p className="mt-2 text-sm text-muted">{area.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <CtaBand />
    </>
  );
}
