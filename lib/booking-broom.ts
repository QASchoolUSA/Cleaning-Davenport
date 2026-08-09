/**
 * Forward a booking to Booking Broom (manager dashboard).
 * No-ops when BOOKING_BROOM_URL / BOOKING_BROOM_API_KEY are unset.
 */

import { readEnv } from "./env";
import {
  ADDON_META,
  DEFAULT_PRICING_CONFIG,
  addOnPrices,
  formatUSD,
  frequencyLabels,
  sqftPresetLabel,
  type AddonId,
  type FrequencyId,
  type PriceBreakdown,
  type PricingConfig,
  type ServiceTypeId,
} from "./pricing";
import { getServiceById } from "./services";
import { siteConfig } from "./site";

export interface CalculatorBookingBody {
  name: string;
  email: string;
  phone: string;
  zip: string;
  address?: string;
  serviceType?: ServiceTypeId;
  sqft?: number;
  bedrooms?: number;
  bathrooms?: number;
  frequency?: FrequencyId;
  addons?: AddonId[];
  intent?: string;
  preferredDate?: string;
  timeWindow?: string;
  notes?: string;
  estimate?: PriceBreakdown;
  source?: string;
}

export interface BookingBroomResult {
  configured: boolean;
  forwarded: boolean;
  id?: string;
  error?: string;
}

/** Only what has no structured home: the customer's message and lead provenance. */
function buildNotes(body: CalculatorBookingBody, localId: string): string {
  const parts: string[] = [];

  if (body.notes?.trim()) parts.push(body.notes.trim());

  parts.push(`Local ID: ${localId}`);
  if (body.intent) parts.push(`Intent: ${body.intent}`);
  if (body.source) parts.push(`Source: ${body.source}`);

  if (body.estimate) {
    parts.push(
      `Estimate breakdown: base ${formatUSD(body.estimate.base)}, bedrooms ${formatUSD(body.estimate.bedrooms)}, bathrooms ${formatUSD(body.estimate.bathrooms)}, add-ons ${formatUSD(body.estimate.addons)}, subtotal ${formatUSD(body.estimate.subtotal)}`,
    );
  }

  return parts.join("\n");
}

function buildProperty(body: CalculatorBookingBody, pricing: PricingConfig) {
  return {
    bedrooms: body.bedrooms ?? undefined,
    bathrooms: body.bathrooms ?? undefined,
    // The calculator collects a band, so report the band rather than its midpoint.
    size_label: body.sqft != null ? sqftPresetLabel(body.sqft, pricing) : undefined,
    home_type: body.serviceType ? resolveServiceType(body) : undefined,
  };
}

function buildQuote(body: CalculatorBookingBody, pricing: PricingConfig) {
  const labels = frequencyLabels(pricing);
  const prices = addOnPrices(pricing);

  return {
    estimate: body.estimate?.total,
    currency: "USD",
    frequency: body.frequency
      ? (labels[body.frequency] ?? body.frequency)
      : undefined,
    add_ons: body.addons?.map((id) => ({
      label: ADDON_META[id]?.label ?? id,
      price: prices[id],
    })),
    payment_terms: "Due after cleaning is complete",
  };
}

function resolveAddress(body: CalculatorBookingBody): string {
  if (body.address?.trim()) return body.address.trim();
  return `ZIP ${body.zip}`;
}

function resolveServiceType(body: CalculatorBookingBody): string {
  if (!body.serviceType) return "Standard Clean";
  return getServiceById(body.serviceType)?.shortName ?? body.serviceType;
}

export function isBookingBroomConfigured(): boolean {
  return Boolean(
    readEnv("BOOKING_BROOM_URL")?.trim() &&
      readEnv("BOOKING_BROOM_API_KEY")?.trim(),
  );
}

export async function forwardToBookingBroom(
  body: CalculatorBookingBody,
  localId: string,
  pricing: PricingConfig = DEFAULT_PRICING_CONFIG,
): Promise<BookingBroomResult> {
  const baseUrl = readEnv("BOOKING_BROOM_URL")?.replace(/\/$/, "").trim();
  const apiKey = readEnv("BOOKING_BROOM_API_KEY")?.trim();
  const siteSlug =
    readEnv("BOOKING_BROOM_SITE_SLUG")?.trim() || siteConfig.bookingSlug;

  if (!baseUrl || !apiKey) {
    console.info(
      "[booking-broom] BOOKING_BROOM_URL / BOOKING_BROOM_API_KEY not set — skip forward",
    );
    return { configured: false, forwarded: false };
  }

  try {
    const response = await fetch(`${baseUrl}/api/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        site_slug: siteSlug,
        api_key: apiKey,
        customer_name: body.name,
        email: body.email,
        phone: body.phone,
        address: resolveAddress(body),
        service_type: resolveServiceType(body),
        preferred_date: body.preferredDate || undefined,
        preferred_time: body.timeWindow || undefined,
        notes: buildNotes(body, localId),
        property: buildProperty(body, pricing),
        quote: buildQuote(body, pricing),
      }),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
      };
      const error = data.error ?? `HTTP ${response.status}`;
      console.error("[booking-broom] forward failed:", error);
      return { configured: true, forwarded: false, error };
    }

    const data = (await response.json()) as { id?: string };
    return { configured: true, forwarded: true, id: data.id };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[booking-broom] forward error:", message);
    return { configured: true, forwarded: false, error: message };
  }
}
