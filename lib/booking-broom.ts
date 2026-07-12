/**
 * Forward a booking to Booking Broom (manager dashboard).
 * No-ops when BOOKING_BROOM_URL / BOOKING_BROOM_API_KEY are unset.
 */

import {
  ADDON_META,
  ADDON_PRICES,
  FREQUENCY_LABELS,
  formatUSD,
  type AddonId,
  type FrequencyId,
  type PriceBreakdown,
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

function buildNotes(body: CalculatorBookingBody, localId: string): string {
  const parts: string[] = [];

  if (body.notes?.trim()) parts.push(body.notes.trim());

  parts.push(`Local ID: ${localId}`);
  if (body.intent) parts.push(`Intent: ${body.intent}`);
  if (body.source) parts.push(`Source: ${body.source}`);

  const details: string[] = [];
  if (body.sqft != null) details.push(`sqft: ${body.sqft}`);
  if (body.bedrooms != null) details.push(`bedrooms: ${body.bedrooms}`);
  if (body.bathrooms != null) details.push(`bathrooms: ${body.bathrooms}`);
  if (body.frequency) {
    details.push(
      `frequency: ${FREQUENCY_LABELS[body.frequency] ?? body.frequency}`,
    );
  }
  if (details.length > 0) parts.push(`Home: ${details.join("; ")}`);

  if (body.addons && body.addons.length > 0) {
    parts.push(
      "Add-ons: " +
        body.addons
          .map((id) => {
            const label = ADDON_META[id]?.label ?? id;
            const price = ADDON_PRICES[id];
            return price != null ? `${label} (${formatUSD(price)})` : label;
          })
          .join("; "),
    );
  }

  if (body.estimate) {
    parts.push(`Estimate total: ${formatUSD(body.estimate.total)}`);
    parts.push(
      `Estimate breakdown: base ${formatUSD(body.estimate.base)}, bedrooms ${formatUSD(body.estimate.bedrooms)}, bathrooms ${formatUSD(body.estimate.bathrooms)}, add-ons ${formatUSD(body.estimate.addons)}, subtotal ${formatUSD(body.estimate.subtotal)}`,
    );
  }

  return parts.join("\n");
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
    process.env.BOOKING_BROOM_URL?.trim() &&
      process.env.BOOKING_BROOM_API_KEY?.trim(),
  );
}

export async function forwardToBookingBroom(
  body: CalculatorBookingBody,
  localId: string,
): Promise<BookingBroomResult> {
  const baseUrl = process.env.BOOKING_BROOM_URL?.replace(/\/$/, "").trim();
  const apiKey = process.env.BOOKING_BROOM_API_KEY?.trim();
  const siteSlug =
    process.env.BOOKING_BROOM_SITE_SLUG?.trim() || siteConfig.bookingSlug;

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
