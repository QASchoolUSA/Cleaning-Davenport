import Image from "next/image";
import Link from "next/link";
import { BookingCalculator } from "@/components/calculator/BookingCalculator";
import { CtaBand, FaqList, ReviewCard, SectionHeading } from "@/components/ui";
import { areas } from "@/lib/areas";
import { reviews, siteFaqs } from "@/lib/content";
import { JsonLd, faqJsonLd } from "@/lib/seo";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(siteFaqs.slice(0, 4))} />

      <section className="relative min-h-[88vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=2000&q=80"
          alt="Sparkling modern kitchen after a professional cleaning"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/75 via-charcoal/55 to-charcoal/25" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-mint">
            Davenport, FL · Pay after cleaning
          </p>
          <h1 className="max-w-3xl font-display text-5xl leading-[1.05] text-white sm:text-6xl md:text-7xl">
            {siteConfig.name}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/85 sm:text-xl">
            Professional house, apartment, Airbnb, and deep cleaning — with a
            simple online quote. No upfront payment.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/book"
              className="rounded-full bg-coral px-6 py-3.5 text-sm font-semibold text-white hover:bg-coral-dark"
            >
              Get your quote
            </Link>
            <Link
              href="/services"
              className="rounded-full border border-white/35 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
            >
              Browse services
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="What we clean"
          title="Cleaning built for real Davenport homes"
          description="From weekly maintenance to move-out resets and Airbnb turnovers — pick the service that matches the job."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative h-44">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl text-charcoal">
                  {service.shortName}
                </h3>
                <p className="mt-2 text-sm text-muted">{service.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="texture-dots border-y border-line/70 bg-white/50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="How it works"
            title="Quote in minutes. Clean. Then pay."
            description="We kept the process simple on purpose — especially on mobile."
            align="center"
          />
          <ol className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Build your estimate",
                text: "Choose service, square footage, bedrooms, bathrooms, frequency, and add-ons.",
              },
              {
                step: "02",
                title: "Request a date or quote",
                text: "Book a preferred window or just save the quote. No card required.",
              },
              {
                step: "03",
                title: "We clean — you pay after",
                text: "Our team completes the visit. Payment happens after the work is done.",
              },
            ].map((item) => (
              <li
                key={item.step}
                className="rounded-2xl border border-line bg-cream/80 p-6"
              >
                <p className="text-xs font-semibold tracking-[0.16em] text-teal">
                  {item.step}
                </p>
                <h3 className="mt-3 font-display text-2xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6" id="calculator">
        <SectionHeading
          eyebrow="Booking calculator"
          title="See your price before you commit"
          description="Live pricing from square footage, rooms, schedule, and extras. Designed for thumbs and desktops alike."
        />
        <BookingCalculator />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Neighbors talking"
          title="Trusted by households across Davenport"
        />
        <div className="grid gap-5 md:grid-cols-3">
          {reviews.slice(0, 3).map((r) => (
            <ReviewCard key={r.name} {...r} />
          ))}
        </div>
        <div className="mt-6">
          <Link href="/reviews" className="text-sm font-semibold text-teal hover:text-teal-dark">
            Read more reviews →
          </Link>
        </div>
      </section>

      <section className="border-y border-line/70 bg-white/60 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Service areas"
            title="Davenport and nearby Central Florida"
            description="Local routes mean better reliability — not a national call center."
          />
          <div className="flex flex-wrap gap-3">
            {areas.map((area) => (
              <Link
                key={area.slug}
                href={`/areas/${area.slug}`}
                className="rounded-full border border-line bg-cream px-4 py-2 text-sm font-medium text-charcoal hover:border-teal hover:bg-teal-light"
              >
                {area.name}
              </Link>
            ))}
          </div>
          <Link
            href="/service-areas"
            className="mt-6 inline-block text-sm font-semibold text-teal hover:text-teal-dark"
          >
            View all service areas →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading eyebrow="FAQ" title="Quick answers before you book" />
        <FaqList items={siteFaqs.slice(0, 5)} />
        <Link
          href="/faq"
          className="mt-6 inline-block text-sm font-semibold text-teal hover:text-teal-dark"
        >
          See all FAQs →
        </Link>
      </section>

      <CtaBand />
    </>
  );
}
