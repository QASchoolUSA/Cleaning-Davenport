import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui";
import { pageTitle } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: pageTitle("Terms of Service"),
  description: `Terms of service for ${siteConfig.name}.`,
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Terms" },
        ]}
      />
      <h1 className="font-display text-4xl">Terms of Service</h1>
      <div className="prose-clean mt-6 space-y-4">
        <p>
          By using {siteConfig.name}’s website and requesting a quote or
          booking, you agree that online estimates are informational and based
          on the details you provide. Final pricing may be confirmed if the home
          or scope differs materially from those details.
        </p>
        <p>
          Payment is due after cleaning services are completed unless otherwise
          agreed in writing. Recurring schedules may be paused or adjusted with
          reasonable notice.
        </p>
        <p>
          Website content is provided for general information about our cleaning
          services in Davenport, FL and nearby areas. For questions, contact{" "}
          {siteConfig.email}.
        </p>
        <p>Last updated: July 11, 2026.</p>
      </div>
    </div>
  );
}
