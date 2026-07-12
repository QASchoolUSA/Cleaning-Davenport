import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui";
import { pageTitle } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: pageTitle("Privacy Policy"),
  description: `Privacy policy for ${siteConfig.name}.`,
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Privacy" },
        ]}
      />
      <h1 className="font-display text-4xl">Privacy Policy</h1>
      <div className="prose-clean mt-6 space-y-4">
        <p>
          {siteConfig.name} (“we”) collects information you submit through our
          quote/booking forms and contact forms — such as name, email, phone,
          address details, and cleaning preferences — so we can respond to your
          request and provide services.
        </p>
        <p>
          We do not sell your personal information. Booking data may be stored
          securely and, once integrated, shared with our scheduling partner
          (Booking Broom) solely to fulfill your request.
        </p>
        <p>
          We may use standard analytics or hosting logs to understand site
          performance. You can email {siteConfig.email} to ask questions about
          your data or request updates.
        </p>
        <p>Last updated: July 11, 2026.</p>
      </div>
    </div>
  );
}
