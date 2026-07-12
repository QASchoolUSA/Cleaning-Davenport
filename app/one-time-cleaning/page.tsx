import type { Metadata } from "next";
import { FrequencyPageView } from "@/components/FrequencyPageView";
import { getFrequencyBySlug } from "@/lib/frequencies";
import { pageTitle } from "@/lib/seo";

const page = getFrequencyBySlug("one-time-cleaning")!;

export const metadata: Metadata = {
  title: pageTitle(page.name),
  description: page.description,
  alternates: { canonical: `/${page.slug}` },
};

export default function Page() {
  return <FrequencyPageView page={page} />;
}
