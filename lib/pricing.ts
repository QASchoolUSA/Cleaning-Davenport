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

/** Base rate per sq ft by service type */
const BASE_PER_SQFT: Record<ServiceTypeId, number> = {
  house: 0.12,
  apartment: 0.13,
  move: 0.18,
  airbnb: 0.16,
  "post-construction": 0.22,
  maintenance: 0.11,
  deep: 0.2,
};

const MIN_BASE: Record<ServiceTypeId, number> = {
  house: 129,
  apartment: 99,
  move: 189,
  airbnb: 149,
  "post-construction": 249,
  maintenance: 109,
  deep: 199,
};

const BEDROOM_RATE = 18;
const BATHROOM_RATE = 28;

export const FREQUENCY_MULTIPLIERS: Record<FrequencyId, number> = {
  "one-time": 1,
  weekly: 0.85,
  "bi-weekly": 0.9,
  monthly: 0.95,
};

export const FREQUENCY_LABELS: Record<FrequencyId, string> = {
  "one-time": "One-time",
  weekly: "Weekly",
  "bi-weekly": "Bi-weekly",
  monthly: "Monthly",
};

export const FREQUENCY_DISCOUNT_LABELS: Record<FrequencyId, string | null> = {
  "one-time": null,
  weekly: "15% off",
  "bi-weekly": "10% off",
  monthly: "5% off",
};

export const ADDON_PRICES: Record<AddonId, number> = {
  "kitchen-deep": 45,
  oven: 35,
  fridge: 35,
  "windows-interior": 40,
  "windows-exterior": 55,
  laundry: 25,
  cabinets: 40,
  garage: 50,
  balcony: 30,
  pets: 20,
};

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

export const SQFT_PRESETS = [
  { label: "Studio / small", value: 600 },
  { label: "1–2 bed", value: 1000 },
  { label: "3 bed", value: 1600 },
  { label: "4 bed", value: 2200 },
  { label: "Large home", value: 3000 },
] as const;

export function calculatePrice(input: PricingInput): PriceBreakdown {
  const sqft = Math.max(400, Math.min(6000, input.sqft));
  const bedrooms = Math.max(0, Math.min(8, input.bedrooms));
  const bathrooms = Math.max(1, Math.min(8, input.bathrooms));

  const rawBase = sqft * BASE_PER_SQFT[input.serviceType];
  const base = Math.max(MIN_BASE[input.serviceType], Math.round(rawBase));
  const bedroomCost = bedrooms * BEDROOM_RATE;
  const bathroomCost = bathrooms * BATHROOM_RATE;
  const addonCost = input.addons.reduce(
    (sum, id) => sum + (ADDON_PRICES[id] ?? 0),
    0,
  );

  const subtotal = base + bedroomCost + bathroomCost + addonCost;
  const frequencyMultiplier = FREQUENCY_MULTIPLIERS[input.frequency];
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
