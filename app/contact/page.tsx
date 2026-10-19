"use client";

import Link from "next/link";
import { Breadcrumbs } from "@/components/ui";
import { areas } from "@/lib/areas";
import { siteConfig } from "@/lib/site";
import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h1 className="font-display text-4xl text-charcoal sm:text-5xl">
            Contact Cleaning Davenport
          </h1>
          <p className="mt-4 text-lg text-muted">
            Questions about a quote, recurring schedule, or whether we cover
            your neighborhood? Send a note — or jump straight into the booking
            calculator.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Most scheduling happens through the online estimator: pick a
            service, home size, and frequency, then request a date or save the
            quote. Email works best for access notes, gated-community
            instructions, or whether your ZIP sits on a current route. We are a
            mobile service-area team — not a walk-in storefront.
          </p>
          <div className="mt-8 space-y-3 rounded-2xl border border-line bg-white p-6 text-sm">
            <p>
              <span className="font-semibold text-charcoal">Email:</span>{" "}
              <a
                className="text-teal hover:underline"
                href={`mailto:${siteConfig.email}`}
              >
                {siteConfig.email}
              </a>
            </p>
            {siteConfig.phone ? (
              <p>
                <span className="font-semibold text-charcoal">Phone:</span>{" "}
                <a className="text-teal hover:underline" href={`tel:${siteConfig.phone}`}>
                  {siteConfig.phone}
                </a>
              </p>
            ) : null}
            <p>
              <span className="font-semibold text-charcoal">Service area:</span>{" "}
              <span className="text-muted">{siteConfig.serviceAreaLabel}</span>
            </p>
            <p className="text-muted">{siteConfig.serviceAreaPolicy}</p>
          </div>

          <div className="mt-8 space-y-4">
            <h2 className="font-display text-2xl text-charcoal">
              Browse before you write
            </h2>
            <p className="text-sm text-muted">
              Open a neighborhood page for local detail, or jump to the service
              and schedule pages most people ask about.
            </p>
            <ul className="flex flex-wrap gap-x-3 gap-y-2 text-sm font-medium">
              {areas.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/areas/${area.slug}`}
                    className="text-teal hover:text-teal-dark"
                  >
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
              <li>
                <Link href="/services" className="text-teal hover:text-teal-dark">
                  All services →
                </Link>
              </li>
              <li>
                <Link
                  href="/services/house-cleaning"
                  className="text-teal hover:text-teal-dark"
                >
                  House cleaning →
                </Link>
              </li>
              <li>
                <Link
                  href="/services/deep-cleaning"
                  className="text-teal hover:text-teal-dark"
                >
                  Deep cleaning →
                </Link>
              </li>
              <li>
                <Link
                  href="/weekly-cleaning"
                  className="text-teal hover:text-teal-dark"
                >
                  Weekly →
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
                <Link href="/blog" className="text-teal hover:text-teal-dark">
                  Blog →
                </Link>
              </li>
              <li>
                <Link href="/book" className="text-coral hover:text-coral-dark">
                  Get a quote →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-line bg-white p-6 sm:p-8">
          {status === "sent" ? (
            <div>
              <h2 className="font-display text-3xl">Message sent</h2>
              <p className="mt-3 text-muted">
                Thanks — we will reply to your email soon. For the fastest
                estimate, you can also use the{" "}
                <a href="/book" className="font-semibold text-teal">
                  booking calculator
                </a>
                .
              </p>
            </div>
          ) : (
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setStatus("sent");
              }}
            >
              <h2 className="font-display text-2xl">Send a message</h2>
              <label className="block text-sm">
                <span className="mb-1.5 block font-semibold">Name</span>
                <input
                  required
                  name="name"
                  className="w-full rounded-xl border border-line px-3 py-3 outline-none focus:border-teal"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1.5 block font-semibold">Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  className="w-full rounded-xl border border-line px-3 py-3 outline-none focus:border-teal"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1.5 block font-semibold">Message</span>
                <textarea
                  required
                  name="message"
                  rows={5}
                  className="w-full rounded-xl border border-line px-3 py-3 outline-none focus:border-teal"
                />
              </label>
              <button
                type="submit"
                className="rounded-full bg-teal px-6 py-3 text-sm font-semibold text-white hover:bg-teal-dark"
              >
                Send message
              </button>
              <p className="text-xs text-muted">
                Prefer email directly? Write us at {siteConfig.email}.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
