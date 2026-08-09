export type ServiceTypeId =
  | "house"
  | "apartment"
  | "move"
  | "airbnb"
  | "post-construction"
  | "maintenance"
  | "deep";

export type FrequencyId = "one-time" | "weekly" | "bi-weekly" | "monthly";

export type AddonId =
  | "kitchen-deep"
  | "oven"
  | "fridge"
  | "windows-interior"
  | "windows-exterior"
  | "laundry"
  | "cabinets"
  | "garage"
  | "balcony"
  | "pets";

export interface PricingInput {
  serviceType: ServiceTypeId;
  sqft: number;
  bedrooms: number;
  bathrooms: number;
  frequency: FrequencyId;
  addons: AddonId[];
}

export interface PriceBreakdown {
  base: number;
  bedrooms: number;
  bathrooms: number;
  addons: number;
  subtotal: number;
  frequencyMultiplier: number;
  frequencyDiscount: number;
  total: number;
}

/**
 * Every number this site charges. Booking Broom is the source of truth; the
 * values in `DEFAULT_PRICING_CONFIG` are what shipped and are used whenever the
 * dashboard cannot be reached, so a quote is never blocked on it.
 */
export type PricingConfig = {
  kind: "sqft-rate-min";
  /** Per-sq-ft rate and the floor the base can never fall below. */
  serviceRates: { key: string; perSqft: number; minBase: number }[];
  bedroomRate: number;
  bathroomRate: number;
  frequencyMultipliers: { key: string; label: string; multiplier: number }[];
  addOns: { key: string; label: string; price: number }[];
  /** Square footage bands; `value` is the midpoint an estimate is built from. */
  sqftPresets: { label: string; value: number }[];
  minSqft: number;
  maxSqft: number;
};

export const DEFAULT_PRICING_CONFIG: PricingConfig = {
  kind: "sqft-rate-min",
  serviceRates: [
    { key: "house", perSqft: 0.12, minBase: 129 },
    { key: "apartment", perSqft: 0.13, minBase: 99 },
    { key: "move", perSqft: 0.18, minBase: 189 },
    { key: "airbnb", perSqft: 0.16, minBase: 149 },
    { key: "post-construction", perSqft: 0.22, minBase: 249 },
    { key: "maintenance", perSqft: 0.11, minBase: 109 },
    { key: "deep", perSqft: 0.2, minBase: 199 },
  ],
  bedroomRate: 18,
  bathroomRate: 28,
  frequencyMultipliers: [
    { key: "one-time", label: "One-time", multiplier: 1 },
    { key: "weekly", label: "Weekly", multiplier: 0.85 },
    { key: "bi-weekly", label: "Bi-weekly", multiplier: 0.9 },
    { key: "monthly", label: "Monthly", multiplier: 0.95 },
  ],
  addOns: [
    { key: "kitchen-deep", label: "Kitchen deep clean", price: 45 },
    { key: "oven", label: "Oven cleaning", price: 35 },
    { key: "fridge", label: "Fridge cleaning", price: 35 },
    { key: "windows-interior", label: "Windows (interior)", price: 40 },
    { key: "windows-exterior", label: "Windows (exterior)", price: 55 },
    { key: "laundry", label: "Laundry fold & put away", price: 25 },
    { key: "cabinets", label: "Inside cabinets", price: 40 },
    { key: "garage", label: "Garage sweep & wipe", price: 50 },
    { key: "balcony", label: "Patio / balcony", price: 30 },
    { key: "pets", label: "Pet-friendly detail", price: 20 },
  ],
  sqftPresets: [
    { label: "Under 800 sq ft", value: 600 },
    { label: "800\u20131,200 sq ft", value: 1000 },
    { label: "1,200\u20132,000 sq ft", value: 1600 },
    { label: "2,000\u20132,600 sq ft", value: 2200 },
    { label: "2,600+ sq ft", value: 3000 },
  ],
  minSqft: 400,
  maxSqft: 6000,
};

const SERVICE_TYPE_IDS: ServiceTypeId[] = [
  "house",
  "apartment",
  "move",
  "airbnb",
  "post-construction",
  "maintenance",
  "deep",
];

const ADDON_IDS: AddonId[] = [
  "kitchen-deep",
  "oven",
  "fridge",
  "windows-interior",
  "windows-exterior",
  "laundry",
  "cabinets",
  "garage",
  "balcony",
  "pets",
];

const FREQUENCY_IDS: FrequencyId[] = [
  "one-time",
  "weekly",
  "bi-weekly",
  "monthly",
];

/**
 * Guards against a remote config that parses as JSON but is missing a service,
 * frequency or add-on the UI iterates over, which would otherwise quote $0 or
 * render an empty picker.
 */
export function isUsablePricingConfig(value: unknown): value is PricingConfig {
  if (!value || typeof value !== "object") return false;
  const config = value as Partial<PricingConfig>;
  if (config.kind !== "sqft-rate-min") return false;
  if (typeof config.bedroomRate !== "number") return false;
  if (typeof config.bathroomRate !== "number") return false;
  if (typeof config.minSqft !== "number") return false;
  if (typeof config.maxSqft !== "number") return false;
  if (!Array.isArray(config.sqftPresets) || config.sqftPresets.length === 0) {
    return false;
  }
  if (!Array.isArray(config.serviceRates)) return false;
  if (!Array.isArray(config.frequencyMultipliers)) return false;
  if (!Array.isArray(config.addOns)) return false;

  return (
    SERVICE_TYPE_IDS.every((id) =>
      config.serviceRates!.some((rate) => rate.key === id),
    ) &&
    FREQUENCY_IDS.every((id) =>
      config.frequencyMultipliers!.some((freq) => freq.key === id),
    ) &&
    ADDON_IDS.every((id) => config.addOns!.some((addOn) => addOn.key === id))
  );
}

export function frequencyMultipliers(
  config: PricingConfig = DEFAULT_PRICING_CONFIG,
): Record<FrequencyId, number> {
  return Object.fromEntries(
    config.frequencyMultipliers.map((freq) => [freq.key, freq.multiplier]),
  ) as Record<FrequencyId, number>;
}

export function frequencyLabels(
  config: PricingConfig = DEFAULT_PRICING_CONFIG,
): Record<FrequencyId, string> {
  return Object.fromEntries(
    config.frequencyMultipliers.map((freq) => [freq.key, freq.label]),
  ) as Record<FrequencyId, string>;
}

/** "15% off" for a 0.85 multiplier; null when there is nothing to advertise. */
export function frequencyDiscountLabels(
  config: PricingConfig = DEFAULT_PRICING_CONFIG,
): Record<FrequencyId, string | null> {
  return Object.fromEntries(
    config.frequencyMultipliers.map((freq) => {
      const off = Math.round((1 - freq.multiplier) * 100);
      return [freq.key, off > 0 ? `${off}% off` : null];
    }),
  ) as Record<FrequencyId, string | null>;
}

export function addOnPrices(
  config: PricingConfig = DEFAULT_PRICING_CONFIG,
): Record<AddonId, number> {
  return Object.fromEntries(
    config.addOns.map((addOn) => [addOn.key, addOn.price]),
  ) as Record<AddonId, number>;
}

/** The published "from $X" floor for each service. */
export function minimumBase(
  config: PricingConfig = DEFAULT_PRICING_CONFIG,
): Record<ServiceTypeId, number> {
  return Object.fromEntries(
    config.serviceRates.map((rate) => [rate.key, rate.minBase]),
  ) as Record<ServiceTypeId, number>;
}

/** Labels stay local copy; only the prices come from the dashboard. */
export const ADDON_META: Record<

  AddonId,
  { label: string; description: string }
> = {
  "kitchen-deep": {
    label: "Kitchen deep clean",
    description: "Counters, sinks, appliances exterior, backsplash detail",
  },
  oven: {
    label: "Oven cleaning",
    description: "Interior oven scrub and racks",
  },
  fridge: {
    label: "Fridge cleaning",
    description: "Interior shelves, drawers, and seals",
  },
  "windows-interior": {
    label: "Windows (interior)",
    description: "Glass and sills inside the home",
  },
  "windows-exterior": {
    label: "Windows (exterior)",
    description: "Outside glass (ground-accessible)",
  },
  laundry: {
    label: "Laundry fold & put away",
    description: "One load washed, folded, and put away",
  },
  cabinets: {
    label: "Inside cabinets",
    description: "Wipe interiors of kitchen cabinets",
  },
  garage: {
    label: "Garage sweep & wipe",
    description: "Floor sweep, cobwebs, and surface wipe-down",
  },
  balcony: {
    label: "Patio / balcony",
    description: "Sweep, wipe railings, and tidy outdoor seating",
  },
  pets: {
    label: "Pet-friendly detail",
    description: "Extra hair removal and pet-area refresh",
  },
};

/**
 * Square footage is picked as a band. `value` is the midpoint the estimate is
 * built from; `label` is what the customer chose and what gets reported, since
 * they never gave an exact figure.
 */
export function sqftPresets(config: PricingConfig = DEFAULT_PRICING_CONFIG) {
  return config.sqftPresets;
}

export function sqftPresetLabel(
  value: number,
  config: PricingConfig = DEFAULT_PRICING_CONFIG,
): string {
  const closest = config.sqftPresets.reduce((best, preset) =>
    Math.abs(preset.value - value) < Math.abs(best.value - value) ? preset : best,
  );
  return closest.label;
}

export function calculatePrice(
  input: PricingInput,
  config: PricingConfig = DEFAULT_PRICING_CONFIG,
): PriceBreakdown {
  const sqft = Math.max(config.minSqft, Math.min(config.maxSqft, input.sqft));
  const bedrooms = Math.max(0, Math.min(8, input.bedrooms));
  const bathrooms = Math.max(1, Math.min(8, input.bathrooms));

  const rate = config.serviceRates.find((r) => r.key === input.serviceType);
  const rawBase = sqft * (rate?.perSqft ?? 0);
  const base = Math.max(rate?.minBase ?? 0, Math.round(rawBase));
  const bedroomCost = bedrooms * config.bedroomRate;
  const bathroomCost = bathrooms * config.bathroomRate;
  const prices = addOnPrices(config);
  const addonCost = input.addons.reduce(
    (sum, id) => sum + (prices[id] ?? 0),
    0,
  );

  const subtotal = base + bedroomCost + bathroomCost + addonCost;
  const frequencyMultiplier =
    config.frequencyMultipliers.find((f) => f.key === input.frequency)
      ?.multiplier ?? 1;
  const total = Math.round(subtotal * frequencyMultiplier);
  const frequencyDiscount = Math.round(subtotal - total);

  return {
    base,
    bedrooms: bedroomCost,
    bathrooms: bathroomCost,
    addons: addonCost,
    subtotal,
    frequencyMultiplier,
    frequencyDiscount,
    total,
  };
}

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
