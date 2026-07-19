import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs, CtaBand } from "@/components/ui";
import { pageTitle } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: pageTitle("About Us"),
  description:
    "Learn about Cleaning Davenport — clear pricing, pay after cleaning, mobile service-area coverage across Davenport and Central Florida, and a process built for trust.",
  alternates: { canonical: "/about" },
};

const processSteps = [
  {
    title: "Estimate online",
    text: "Our calculator prices from square footage, bedrooms, bathrooms, frequency, and add-ons—so you see a real number before you commit.",
  },
  {
    title: "Book or save the quote",
    text: "Request a booking when you are ready, or take the estimate first. No deposit wall just to get on the calendar.",
  },
  {
    title: "We clean to the checklist",
    text: "House, deep, move, Airbnb, and post-construction each use different standards. The crew works the scope you approved.",
  },
  {
    title: "You pay after service",
    text: "We earn the invoice. You review the finished job, then pay—exactly as our booking flow promises.",
  },
];

export default function AboutPage() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    email: siteConfig.email,
    description: `${siteConfig.description} ${siteConfig.serviceAreaPolicy}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      addressCountry: siteConfig.address.country,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "About" },
          ]}
        />
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="font-display text-4xl text-charcoal sm:text-5xl">
              Local cleaners. Honest process. Homes that feel lighter.
            </h1>
            <div className="prose-clean mt-6">
              <p>
                {siteConfig.name} started with a simple frustration: getting a
                cleaning quote in Davenport should not require a sales call, a
                deposit, or a vague “we will get back to you.” Homeowners want
                to know what they are roughly paying, when someone can come, and
                whether the team will actually show up.
              </p>
              <p>
                So we built the experience around that. Our booking calculator
                prices from square footage, bedrooms, bathrooms, frequency, and
                add-ons. You can request a booking or take the quote first. You
                never pay before the cleaning is finished.
              </p>
              <p>
                We serve {siteConfig.serviceAreaLabel} — families, Airbnb hosts,
                renters preparing for move-out, and homeowners finishing
                renovations. Different jobs need different checklists, which is
                why house cleaning, deep cleaning, post-construction, and
                turnover cleans are separate services instead of one vague
                “cleaning.”
              </p>
              <p>
                Questions? Email{" "}
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>{" "}
                or visit{" "}
                <Link href="/contact">contact</Link>.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <Image
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=80"
              alt="Cleaning professional caring for a kitchen in a Davenport home"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="mt-16">
          <h2 className="font-display text-3xl text-charcoal">How we work</h2>
          <p className="mt-3 max-w-2xl text-muted">
            Trust is easier when the steps are visible. Here is the path from
            first estimate to pay-after-cleaning.
          </p>
          <ol className="mt-8 grid gap-5 md:grid-cols-2">
            {processSteps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-2xl border border-line bg-white p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Step {index + 1}
                </p>
                <h3 className="mt-2 font-display text-2xl">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Clarity first",
              text: "Live estimates and plain-language scopes so you are not guessing what is included.",
            },
            {
              title: "Pay after service",
              text: "We earn the invoice. No upfront payment walls just to get on the calendar.",
            },
            {
              title: "Local routes",
              text: "Davenport-centered scheduling keeps travel realistic and communication close.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-line bg-white p-6"
            >
              <h2 className="font-display text-2xl">{item.title}</h2>
              <p className="mt-2 text-sm text-muted">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="prose-clean mt-16 max-w-3xl">
          <h2 className="font-display text-3xl text-charcoal">Service-area policy</h2>
          <p>{siteConfig.serviceAreaPolicy}</p>
          <p>
            Coverage centers on Davenport with nearby Central Florida communities
            when routes allow. See{" "}
            <Link href="/service-areas">service areas</Link> for neighborhood
            detail, or ask when you request a quote if your address sits just
            outside our usual path.
          </p>
        </div>
      </div>
      <CtaBand title="Want to see if we are a fit?" />
    </>
  );
}
