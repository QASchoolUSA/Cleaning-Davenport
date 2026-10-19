import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingCalculatorServer } from "@/components/calculator/BookingCalculatorServer";
import { QuoteLaunchCard } from "@/components/QuoteLaunchCard";
import {
  Breadcrumbs,
  CtaBand,
  FaqList,
  SectionHeading,
} from "@/components/ui";
import { areas, getAreaBySlug } from "@/lib/areas";
import { blogPosts } from "@/lib/blog";
import { frequencyPages } from "@/lib/frequencies";
import { JsonLd, breadcrumbJsonLd, faqJsonLd, pageTitle } from "@/lib/seo";
import { services } from "@/lib/services";

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) return {};
  return {
    title: pageTitle(`Cleaning Services in ${area.name}`),
    description: area.description,
    alternates: { canonical: `/areas/${area.slug}` },
    openGraph: {
      title: `Cleaning in ${area.name}`,
      description: area.description,
      images: [{ url: area.image }],
    },
  };
}

export default async function AreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) notFound();
  const otherAreas = areas.filter((a) => a.slug !== area.slug);
  const areaFaqs = [
    ...area.faqs,
    {
      question: `What details should I share before booking in ${area.name}?`,
      answer: `Provide the full address, home size, bathrooms, service type, preferred date, pets, parking or gate instructions, and any specialty surfaces. That helps confirm coverage and creates a more accurate scope for ${area.name}.`,
    },
  ];

  return (
    <>
      <JsonLd
        data={[
          faqJsonLd(areaFaqs),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Service Areas", path: "/service-areas" },
            { name: area.name, path: `/areas/${area.slug}` },
          ]),
        ]}
      />
      <section className="relative min-h-[48vh] overflow-hidden">
        <Image
          src={area.image}
          alt={area.imageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/45 to-charcoal/20" />
        <div className="relative mx-auto flex min-h-[48vh] max-w-6xl flex-col justify-end px-4 pb-12 sm:px-6">
          <Breadcrumbs
            light
            items={[
              { label: "Home", href: "/" },
              { label: "Areas", href: "/service-areas" },
              { label: area.name },
            ]}
          />
          <h1 className="max-w-3xl font-display text-4xl text-white sm:text-5xl">
            {area.headline}
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
          <article className="prose-clean">
            {area.longContent.map((p) => (
              <p key={p.slice(0, 28)}>{p}</p>
            ))}
            <h2>How to prepare for a cleaning visit in {area.name}</h2>
            <p>
              Clear personal items from priority counters and floors, secure pets,
              and provide entry, parking, gate, or building instructions before
              arrival. Note specialty stone, wood, or floor finishes and separate
              ordinary cleaning from repairs, hauling, pest work, or active mold
              remediation.
            </p>
          </article>
          <aside className="rounded-2xl border border-line bg-white p-6">
            <h2 className="font-display text-2xl">Neighborhoods & pockets</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {area.neighborhoods.map((n) => (
                <li key={n}>• {n}</li>
              ))}
            </ul>
            <h3 className="mt-6 font-semibold text-charcoal">Services we offer here</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="rounded-full bg-teal-light px-3 py-1 text-xs font-semibold text-teal-dark"
                >
                  {s.shortName}
                </Link>
              ))}
            </div>
            <h3 className="mt-6 font-semibold text-charcoal">Schedules</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {frequencyPages.map((freq) => (
                <Link
                  key={freq.slug}
                  href={`/${freq.slug}`}
                  className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-charcoal hover:border-teal"
                >
                  {freq.name}
                </Link>
              ))}
            </div>
          </aside>
        </div>

        <section className="mt-16">
          <SectionHeading title={`FAQ for ${area.name}`} />
          <FaqList items={areaFaqs} />
        </section>

        <section className="mt-16">
          <SectionHeading
            title="Nearby communities"
            description="Same pay-after-cleaning model across our Central Florida routes."
          />
          <ul className="flex flex-wrap gap-3">
            {otherAreas.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/areas/${a.slug}`}
                  className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium hover:border-teal"
                >
                  {a.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/service-areas"
                className="rounded-full border border-line bg-cream px-4 py-2 text-sm font-medium hover:border-teal"
              >
                All service areas →
              </Link>
            </li>
          </ul>
          <ul className="mt-6 space-y-2 text-sm font-medium">
            {blogPosts.slice(0, 4).map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-teal hover:text-teal-dark"
                >
                  {post.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/blog" className="text-teal hover:text-teal-dark">
                All blog posts →
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-teal hover:text-teal-dark">
                Contact →
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-teal hover:text-teal-dark">
                About →
              </Link>
            </li>
          </ul>
        </section>

        <section className="mt-16">
          <SectionHeading
            title={`Get a cleaning quote in ${area.name}`}
            description="Tell us your home size and schedule — pay only after cleaning."
          />
          <div className="md:hidden">
            <QuoteLaunchCard />
          </div>
          <div className="hidden md:block">
            <BookingCalculatorServer />
          </div>
        </section>
      </div>
      <CtaBand title={`Book cleaning in ${area.name}`} />
    </>
  );
}
