import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs, CtaBand, SectionHeading } from "@/components/ui";
import { areas } from "@/lib/areas";
import { blogPosts } from "@/lib/blog";
import { pageTitle } from "@/lib/seo";
import { services } from "@/lib/services";

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
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          We are a mobile crew, not a storefront. Travel time and same-day
          windows depend on the address, so gated communities (Champions Gate
          and similar) should include gate and parking notes in the booking
          form. If your ZIP sits just outside the list below, email us or run
          the calculator anyway — we will say clearly whether the route works.
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

        <div className="mt-16">
          <SectionHeading
            title="Services available across these areas"
            description="Same checklists and online pricing — open a service page for scope detail."
          />
          <ul className="flex flex-wrap gap-3">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="rounded-full border border-line bg-cream px-4 py-2 text-sm font-medium hover:border-teal hover:bg-teal-light"
                >
                  {service.shortName}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium">
            <Link href="/weekly-cleaning" className="text-teal hover:text-teal-dark">
              Weekly cleaning →
            </Link>
            <Link href="/bi-weekly-cleaning" className="text-teal hover:text-teal-dark">
              Bi-weekly →
            </Link>
            <Link href="/monthly-cleaning" className="text-teal hover:text-teal-dark">
              Monthly →
            </Link>
            <Link href="/about" className="text-teal hover:text-teal-dark">
              About →
            </Link>
            <Link href="/contact" className="text-teal hover:text-teal-dark">
              Contact →
            </Link>
            <Link href="/book" className="text-coral hover:text-coral-dark">
              Get a quote →
            </Link>
          </div>
        </div>

        <div className="mt-16">
          <SectionHeading title="Local cleaning guides" />
          <ul className="mt-2 space-y-2 text-sm font-medium">
            {blogPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-teal hover:text-teal-dark"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <CtaBand />
    </>
  );
}
