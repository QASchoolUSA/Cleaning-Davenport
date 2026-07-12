export interface FrequencyPage {
  slug: string;
  frequencyId: "one-time" | "weekly" | "bi-weekly" | "monthly";
  name: string;
  headline: string;
  description: string;
  discountLabel: string | null;
  longContent: string[];
  benefits: string[];
  faqs: { question: string; answer: string }[];
  image: string;
  imageAlt: string;
}

export const frequencyPages: FrequencyPage[] = [
  {
    slug: "one-time-cleaning",
    frequencyId: "one-time",
    name: "One-Time Cleaning",
    headline: "Book a single cleaning when you need it — no subscription required",
    description:
      "One-time house, deep, move, or specialty cleaning in Davenport, FL. Get an instant estimate and pay after service.",
    discountLabel: null,
    longContent: [
      "Sometimes you do not need a recurring plan — you need the house handled once, done right. One-time cleaning covers parties, seasonal resets, move dates, photo days, and those “we have let this go too long” moments.",
      "Pick the service type that matches the job. A standard house clean works for light catch-up. Deep cleaning or move-out cleaning is better when detail work matters. Add oven, fridge, or window extras only if you need them.",
      "You will still see transparent pricing from square footage, bedrooms, and bathrooms. No membership lock-in, and no payment until the cleaning is finished.",
    ],
    benefits: [
      "No recurring commitment",
      "Ideal before events or after travel",
      "Upgrade-ready with specialty add-ons",
    ],
    faqs: [
      {
        question: "Can I switch to recurring later?",
        answer:
          "Absolutely. Many clients book one-time first, then move to weekly or bi-weekly once they like the results.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "One-time professional kitchen cleaning in progress",
  },
  {
    slug: "weekly-cleaning",
    frequencyId: "weekly",
    name: "Weekly Cleaning",
    headline: "Weekly cleaning for homes that cannot wait two weeks",
    description:
      "Weekly house and maintenance cleaning in Davenport with 15% recurring savings. Pay after each visit.",
    discountLabel: "15% off vs one-time",
    longContent: [
      "Weekly cleaning is for households where life generates mess faster than weekends can absorb it — kids, pets, remote work crumbs, and Florida bathrooms that film over between visits.",
      "You get the largest recurring discount in our calculator, and the home stays closer to “done” so deep-clean emergencies become rare. Most weekly clients use maintenance or house cleaning as the base service, with occasional add-ons.",
      "Prefer the same rhythm every week? Choose your preferred day and time window when you book. We confirm availability and keep you on a steady schedule.",
    ],
    benefits: [
      "15% recurring discount",
      "Best for families and pet homes",
      "Prevents grime from stacking up",
    ],
    faqs: [
      {
        question: "Do I pay weekly in advance?",
        answer:
          "No. Each visit is completed first. Payment happens after cleaning.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Kitchen kept tidy with weekly maintenance cleaning",
  },
  {
    slug: "bi-weekly-cleaning",
    frequencyId: "bi-weekly",
    name: "Bi-Weekly Cleaning",
    headline: "The popular middle ground — clean every two weeks",
    description:
      "Bi-weekly cleaning in Davenport, FL with 10% savings. Balanced cadence for most households.",
    discountLabel: "10% off vs one-time",
    longContent: [
      "Bi-weekly is our most common recurring plan because it matches how many Davenport homes actually get dirty — not overnight, but definitely within fourteen days.",
      "You save compared with one-time rates while keeping kitchens, baths, and floors from crossing into deep-clean territory. It is especially popular with couples, smaller families, and professionals who travel mid-month.",
      "Start with a deep clean if the house needs a reset, then settle into bi-weekly maintenance. That combination is the efficiency play most clients eventually choose.",
    ],
    benefits: [
      "10% recurring discount",
      "Most popular plan locally",
      "Pairs well after an initial deep clean",
    ],
    faqs: [
      {
        question: "What if I need to skip a visit?",
        answer:
          "Tell us as soon as you can and we will reschedule. Life happens — we prefer communication over rigid penalties.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Living room maintained on a bi-weekly cleaning plan",
  },
  {
    slug: "monthly-cleaning",
    frequencyId: "monthly",
    name: "Monthly Cleaning",
    headline: "Monthly cleaning for lighter households and second homes",
    description:
      "Monthly home cleaning around Davenport with 5% recurring savings and pay-after-service billing.",
    discountLabel: "5% off vs one-time",
    longContent: [
      "Monthly cleaning suits homes that stay relatively tidy or sit empty part of the month — second homes, light-occupancy apartments, and meticulous one- or two-person households.",
      "Between visits, a little daily tidying still helps, because thirty days is enough for Florida humidity to leave its mark on showers and floors. Some clients book monthly maintenance and add a deep clean each season.",
      "You will see the monthly discount applied automatically in the booking calculator. As always, payment is due after the cleaning, not before.",
    ],
    benefits: [
      "5% recurring discount",
      "Good for light occupancy",
      "Easy seasonal deep-clean upgrades",
    ],
    faqs: [
      {
        question: "Is monthly enough in Florida?",
        answer:
          "It can be, if the household is light and bathrooms are wiped between visits. If film and dust build quickly, bi-weekly is usually happier.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Comfortable living room refreshed with monthly cleaning",
  },
];

export function getFrequencyBySlug(slug: string): FrequencyPage | undefined {
  return frequencyPages.find((f) => f.slug === slug);
}
