import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs, CtaBand } from "@/components/ui";
import { pageTitle } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: pageTitle("About Us"),
  description:
    "Learn about Cleaning Davenport — a local Central Florida cleaning company focused on clear pricing, reliable crews, and paying only after the job is done.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
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
                We serve Davenport and nearby Central Florida communities —
                families, Airbnb hosts, renters preparing for move-out, and
                homeowners finishing renovations. Different jobs need different
                checklists, which is why house cleaning, deep cleaning,
                post-construction, and turnover cleans are separate services
                instead of one vague “cleaning.”
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
      </div>
      <CtaBand title="Want to see if we are a fit?" />
    </>
  );
}
