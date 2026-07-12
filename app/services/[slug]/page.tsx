import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingCalculator } from "@/components/calculator/BookingCalculator";
import {
  Breadcrumbs,
  CtaBand,
  FaqList,
  SectionHeading,
} from "@/components/ui";
import {
  JsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  pageTitle,
  serviceJsonLd,
} from "@/lib/seo";
import { getServiceBySlug, services } from "@/lib/services";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: pageTitle(service.name),
    description: service.description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.name,
      description: service.description,
      images: [{ url: service.image }],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = services.filter((s) =>
    service.relatedSlugs.includes(s.slug),
  );

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            name: service.name,
            description: service.description,
            path: `/services/${service.slug}`,
          }),
          faqJsonLd(service.faqs),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.shortName, path: `/services/${service.slug}` },
          ]),
        ]}
      />

      <section className="relative min-h-[52vh] overflow-hidden">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/45 to-charcoal/20" />
        <div className="relative mx-auto flex min-h-[52vh] max-w-6xl flex-col justify-end px-4 pb-12 sm:px-6">
          <Breadcrumbs
            light
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: service.shortName },
            ]}
          />
          <h1 className="max-w-3xl font-display text-4xl text-white sm:text-5xl">
            {service.name}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/85">
            {service.tagline}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr]">
          <article className="prose-clean">
            {service.longContent.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </article>
          <aside className="space-y-6">
            <div className="rounded-2xl border border-line bg-white p-6">
              <h2 className="font-display text-2xl">What’s included</h2>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {service.includes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-teal">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-teal-light/50 p-6">
              <h2 className="font-display text-2xl">Ideal for</h2>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {service.idealFor.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <Link
                href="/book"
                className="mt-5 inline-flex rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-white hover:bg-coral-dark"
              >
                Get a quote
              </Link>
            </div>
          </aside>
        </div>

        <section className="mt-16">
          <SectionHeading
            title={`FAQ about ${service.shortName.toLowerCase()}`}
          />
          <FaqList items={service.faqs} />
        </section>

        <section className="mt-16">
          <SectionHeading
            title="Estimate this service"
            description="Pre-selected for you — adjust size, frequency, and add-ons as needed."
          />
          <BookingCalculator defaultService={service.id} />
        </section>

        {related.length > 0 ? (
          <section className="mt-16">
            <SectionHeading title="Related services" />
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/services/${r.slug}`}
                  className="rounded-2xl border border-line bg-white p-5 hover:border-teal"
                >
                  <h3 className="font-display text-xl">{r.shortName}</h3>
                  <p className="mt-2 text-sm text-muted line-clamp-3">
                    {r.tagline}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>
      <CtaBand />
    </>
  );
}
