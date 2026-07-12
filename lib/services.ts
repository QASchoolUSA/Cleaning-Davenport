import type { ServiceTypeId } from "./pricing";

export interface ServiceDef {
  id: ServiceTypeId;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  longContent: string[];
  includes: string[];
  idealFor: string[];
  image: string;
  imageAlt: string;
  faqs: { question: string; answer: string }[];
  relatedSlugs: string[];
}

export const services: ServiceDef[] = [
  {
    id: "house",
    slug: "house-cleaning",
    name: "House Cleaning in Davenport, FL",
    shortName: "House Cleaning",
    tagline: "Keep your whole home fresh without spending your weekend on chores.",
    description:
      "Reliable house cleaning for Davenport homeowners — kitchens, baths, living areas, and bedrooms cleaned to a consistent standard.",
    longContent: [
      "Life in Davenport moves fast. Between school drop-offs, theme-park weekends, and Central Florida humidity that seems to cling to everything, keeping a house truly clean can feel like a second job. Our house cleaning service is built for real homes — not showrooms — so you get consistent results without micromanaging every wipe and vacuum pass.",
      "We start with the rooms that matter most day to day: kitchens and bathrooms get detailed attention, living areas are dusted and vacuumed, and bedrooms are refreshed so the whole house feels lighter when you walk back in. Floors are swept, mopped, or vacuumed based on surface type, and high-touch spots like light switches and door handles are wiped as part of the routine.",
      "Whether you live near Posner Park, in a quiet cul-de-sac off US-27, or closer to the Four Corners area, we schedule around your life. Choose a one-time refresh or lock in weekly, bi-weekly, or monthly visits so the house never gets ahead of you again. You see a clear estimate before we arrive, and you only pay after the cleaning is done.",
      "If you are comparing house cleaners in Davenport, look for consistency more than one spectacular visit. Our teams follow a checklist, bring supplies unless you prefer your own products, and communicate if something needs a deeper follow-up. That is how a house stays genuinely comfortable week after week.",
    ],
    includes: [
      "Kitchen counters, sinks, and appliance exteriors",
      "Bathroom sinks, toilets, showers, and mirrors",
      "Dusting of reachable surfaces and furniture",
      "Vacuuming carpets and rugs",
      "Sweeping and mopping hard floors",
      "Bedroom and living area tidy-up",
      "Trash emptied (as requested)",
    ],
    idealFor: [
      "Busy families who want weekends back",
      "Homeowners preparing for guests",
      "Anyone who prefers a set cleaning schedule",
    ],
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Professional cleaner wiping a bright kitchen countertop",
    faqs: [
      {
        question: "How long does a typical house cleaning take?",
        answer:
          "Most Davenport homes take 2–4 hours depending on size, clutter level, and whether add-ons like oven or fridge cleaning are included. We confirm timing when we quote.",
      },
      {
        question: "Do I need to be home?",
        answer:
          "No. Many clients leave a key or lockbox code. We respect your home and send a quick update when we finish.",
      },
      {
        question: "Are cleaning supplies included?",
        answer:
          "Yes, we bring professional supplies. If you prefer specific products (pet-safe, fragrance-free), tell us in the notes when you book.",
      },
    ],
    relatedSlugs: ["deep-cleaning", "maintenance-cleaning", "apartment-cleaning"],
  },
  {
    id: "apartment",
    slug: "apartment-cleaning",
    name: "Apartment Cleaning in Davenport",
    shortName: "Apartment Cleaning",
    tagline: "Compact spaces cleaned thoroughly — no corners cut because it is smaller.",
    description:
      "Apartment and condo cleaning tailored to Davenport rentals and smaller homes, with efficient visits and clear pricing.",
    longContent: [
      "Apartments and condos in and around Davenport deserve the same care as larger houses — sometimes more, because every square foot has to work harder. Our apartment cleaning service focuses on kitchens, baths, and living zones that show wear first, without overcharging for rooms you do not have.",
      "We plan routes efficiently so we can offer fair pricing for studios through larger multi-bedroom units. Floors, counters, fixtures, and dust-prone ledges get attention every visit. If your building has specific access rules or quiet hours, note them when you book and we will work within them.",
      "Renters often call us before move-out inspections or when hosting family for the holidays. Owners who keep a Davenport condo as a second home use us between stays so the place always feels guest-ready. Either way, you get a transparent estimate based on square footage, bedrooms, bathrooms, and any add-ons you choose.",
      "Central Florida humidity can leave bathrooms looking tired faster than you expect. Regular apartment cleaning keeps mold-prone areas wiped and floors dry, which helps the unit feel fresher between deep cleans.",
    ],
    includes: [
      "Full kitchen and bathroom detail",
      "Living room and bedroom refresh",
      "Floors vacuumed and mopped",
      "Mirrors and glass fixtures cleaned",
      "Dusting within reach",
      "Optional fridge, oven, and window add-ons",
    ],
    idealFor: [
      "Apartment and condo residents",
      "Renters prepping for inspections",
      "Second-home owners between visits",
    ],
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Bright modern apartment living room ready after cleaning",
    faqs: [
      {
        question: "Can you clean high-rise or gated apartments?",
        answer:
          "Yes. Share gate codes, parking instructions, and elevator notes in your booking so arrival is smooth.",
      },
      {
        question: "Is apartment pricing different from house cleaning?",
        answer:
          "Quotes use square footage, bedrooms, and bathrooms, so smaller apartments usually land at a lower total than larger houses — with the same quality standard.",
      },
    ],
    relatedSlugs: ["house-cleaning", "move-out-move-in-cleaning", "airbnb-cleaning"],
  },
  {
    id: "move",
    slug: "move-out-move-in-cleaning",
    name: "Move-Out & Move-In Cleaning",
    shortName: "Move Out / Move In",
    tagline: "Empty-home cleans that help you hand over keys — or walk into a fresh start.",
    description:
      "Detailed move-out and move-in cleaning for Davenport rentals and homes, including kitchens, baths, floors, and hard-to-reach spots.",
    longContent: [
      "Moving is stressful enough without scrubbing baseboards at midnight. Our move-out and move-in cleaning is designed for empty or nearly empty homes in Davenport, so every surface can actually be reached and cleaned properly.",
      "Landlords and property managers often need a unit turned quickly between tenants. Homebuyers want to unpack into a space that does not still smell like the previous owner’s kitchen. We treat both situations with a deeper checklist than a regular maintenance clean: inside cabinets (when requested), appliance interiors as add-ons, closet shelves, and floors that have been hiding under furniture for years.",
      "Because move cleans are more intensive, pricing reflects square footage and the deep-clean nature of the work. Add oven, fridge, or cabinet interiors if your lease or HOA checklist calls for them. You still pay after the work is finished — no deposit required to get on the calendar.",
      "If you are racing a lease end date, book early and tell us your hard deadline. We will do our best to schedule a visit that protects your timeline without rushing the quality you need for deposit return photos.",
    ],
    includes: [
      "Deep clean of kitchens and bathrooms",
      "Interior wipe of empty cabinets (add-on available for full detail)",
      "Closet and shelf dusting",
      "Baseboards and reachable trim",
      "Full floor care throughout",
      "Fixture and switch plate wipe-down",
    ],
    idealFor: [
      "Tenants ending a lease",
      "New homeowners before unpacking",
      "Landlords turning units between renters",
    ],
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Empty room with moving boxes ready for move-out cleaning",
    faqs: [
      {
        question: "Should the home be empty?",
        answer:
          "Empty is ideal. If some furniture remains, we clean around it, but results are best when floors and cabinets are accessible.",
      },
      {
        question: "Will this help with my security deposit?",
        answer:
          "A thorough move-out clean improves your chances, especially when paired with carpet or appliance needs listed in your lease. We cannot guarantee deposit return — that is up to your landlord — but we clean to a high turnover standard.",
      },
    ],
    relatedSlugs: ["deep-cleaning", "apartment-cleaning", "house-cleaning"],
  },
  {
    id: "airbnb",
    slug: "airbnb-cleaning",
    name: "Airbnb & Short-Term Rental Cleaning",
    shortName: "Airbnb Cleaning",
    tagline: "Turnover cleans that protect reviews — beds reset, baths sparkling, guest-ready every time.",
    description:
      "Airbnb and vacation rental cleaning for Davenport and nearby resorts, with reliable turnovers between guest stays.",
    longContent: [
      "In Davenport and the surrounding vacation corridor, guest expectations are high and turnover windows are short. Our Airbnb cleaning service focuses on the details that drive five-star reviews: spotless bathrooms, fresh kitchens, made beds, and living spaces that photograph well for your listing.",
      "Hosts tell us the same story: one late or incomplete clean can cost a booking and a review. We work from a turnover checklist you can customize — trash out, surfaces wiped, floors done, bathrooms sanitized, and staging basics restored. Add laundry folding if you need linens handled on-site.",
      "Whether you manage one condo near Champions Gate or a portfolio of homes, consistent cleaners matter more than the cheapest quote. We price by property size and add-ons so you can forecast costs per turnover, and you only pay after each clean is complete.",
      "Same-day or next-day turnovers are common in this market. Book with your guest checkout and check-in times in the notes so we can plan arrivals that protect your calendar.",
    ],
    includes: [
      "Full bathroom and kitchen sanitation",
      "Bedroom reset and surface dusting",
      "Floors vacuumed and mopped",
      "Trash removal and basic staging tidy",
      "Guest-facing surfaces wiped",
      "Optional linen laundry add-on",
    ],
    idealFor: [
      "Airbnb and VRBO hosts",
      "Vacation rental managers",
      "Second-home owners who host seasonally",
    ],
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Hotel-style bedroom prepared for short-term rental guests",
    faqs: [
      {
        question: "Can you work between same-day checkouts and check-ins?",
        answer:
          "Often yes, if the window is realistic for the property size. Share exact times when you request a booking so we can confirm.",
      },
      {
        question: "Do you bring linens?",
        answer:
          "We can fold and put away laundry as an add-on. Supplying fresh linens is typically the host’s responsibility unless arranged separately.",
      },
    ],
    relatedSlugs: ["apartment-cleaning", "maintenance-cleaning", "house-cleaning"],
  },
  {
    id: "post-construction",
    slug: "post-construction-cleaning",
    name: "Post-Construction Cleaning",
    shortName: "Post Construction",
    tagline: "Dust, debris, and fine particles cleared so your renovation finally feels finished.",
    description:
      "Post-construction and renovation cleaning in Davenport — from rough clean support to detailed final dust removal.",
    longContent: [
      "A renovation is not done until the dust is gone. Post-construction cleaning in Davenport homes means dealing with fine drywall dust that settles on every ledge, inside tracks, and across brand-new floors. Regular house cleaning is not built for that load — this service is.",
      "We focus on systematic dust removal, fixture detailing, cabinet exteriors, and floor care after builders or remodelers leave. Depending on the job, you may need more than one pass; fine dust can reappear after HVAC cycles. Tell us what stage you are in (rough, final, or touch-up) so we quote the right intensity.",
      "New builds, kitchen remodels, flooring swaps, and bathroom gut jobs are common requests. Wear-and-tear from construction traffic also leaves sticky residue and footprints that need more than a quick mop. Our teams come prepared for heavier cleaning than a maintenance visit.",
      "If your contractor left a punch list that includes a clean handoff, we can align our visit with your walkthrough date. You get an estimate up front and pay when the cleaning is complete.",
    ],
    includes: [
      "Fine dust removal from surfaces and ledges",
      "Fixture and hardware wipe-down",
      "Cabinet exterior cleaning",
      "Floor sweeping, vacuuming, and mopping",
      "Window sill and track attention",
      "Construction debris sweep-up (light leftover trash)",
    ],
    idealFor: [
      "Homeowners after remodel",
      "New construction handoffs",
      "Contractors needing a final clean",
    ],
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Home renovation interior needing post-construction cleaning",
    faqs: [
      {
        question: "Is this the same as a deep clean?",
        answer:
          "It is related but heavier. Post-construction focuses on dust and residue from building work, which can require different tools and more time than a standard deep clean.",
      },
      {
        question: "Can you clean while contractors are still finishing?",
        answer:
          "Final cleans work best when major dust-producing work is finished. We can discuss a rough clean earlier if needed.",
      },
    ],
    relatedSlugs: ["deep-cleaning", "move-out-move-in-cleaning", "house-cleaning"],
  },
  {
    id: "maintenance",
    slug: "maintenance-cleaning",
    name: "Maintenance Cleaning",
    shortName: "Maintenance Cleaning",
    tagline: "Steady upkeep so your home never slides back into chaos.",
    description:
      "Recurring maintenance cleaning for Davenport homes — the practical middle ground between a one-time tidy and a full deep clean.",
    longContent: [
      "Maintenance cleaning is the rhythm that keeps a home livable. Dust returns, bathrooms film over, and kitchen grease builds quietly — especially in Florida’s climate. Our maintenance visits are designed to reset the house on a schedule you can trust.",
      "Think of this as your regular reset: kitchens and baths cleaned thoroughly, floors done, surfaces dusted, and the lived-in mess handled before it becomes a weekend project. It is not as intensive as a deep clean or move-out job, which is why it prices more accessibly and works beautifully on weekly or bi-weekly plans.",
      "Many Davenport clients start with a deep clean, then switch to maintenance so the results last. Others jump straight into a recurring plan if the home is already in decent shape. Either path works — our calculator shows the difference so you can choose with clear numbers.",
      "Consistency is the product. Same standards, predictable timing, and clear communication if something needs an upgrade to a deeper service for one visit.",
    ],
    includes: [
      "Kitchen and bathroom cleaning",
      "Surface dusting",
      "Floor care throughout main areas",
      "Bedroom and living space tidy",
      "Trash emptied on request",
      "Recurring schedule options",
    ],
    idealFor: [
      "Households that want a set rhythm",
      "Clients after an initial deep clean",
      "Professionals who travel often",
    ],
    image:
      "https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Organized kitchen maintained with regular professional cleaning",
    faqs: [
      {
        question: "How often should I schedule maintenance cleaning?",
        answer:
          "Weekly suits busy families and pet homes. Bi-weekly is the most popular balance. Monthly works for lighter households or second homes.",
      },
      {
        question: "Can I upgrade one visit to a deep clean?",
        answer:
          "Yes. Message us before the appointment and we can adjust scope and pricing for that date.",
      },
    ],
    relatedSlugs: ["house-cleaning", "deep-cleaning", "apartment-cleaning"],
  },
  {
    id: "deep",
    slug: "deep-cleaning",
    name: "Deep Cleaning in Davenport, FL",
    shortName: "Deep Cleaning",
    tagline: "The thorough reset — baseboards, detail work, and the spots regular cleaning skips.",
    description:
      "Deep cleaning for Davenport homes when dust, grease, and neglect need more than a standard visit.",
    longContent: [
      "A deep clean is what you book when the house needs a true reset. Maybe it has been months since the last thorough clean, maybe you are preparing to host, or maybe you simply want every bathroom and kitchen brought back to a higher baseline. Our deep cleaning service in Davenport goes beyond maintenance checklists.",
      "We spend more time on detail work: baseboards, door frames, light fixtures within reach, harder water spots, and the build-up that hides behind everyday use. Kitchens and bathrooms get extended attention. Floors are cleaned with the expectation that dirt has had time to settle.",
      "Deep cleans pair well with add-ons like oven, fridge, interior windows, and inside cabinets. Those extras are where “looks clean” becomes “feels new.” After a deep clean, many clients drop to a maintenance schedule so the home stays at that higher standard without paying deep-clean rates every time.",
      "Humidity, open windows, and Florida living mean dust and residue return — but starting from a deep clean makes every future visit more effective. Get your estimate online, pick a date, and pay only after we finish.",
    ],
    includes: [
      "Extended kitchen and bath detailing",
      "Baseboards and trim wipe-down",
      "Detailed dusting of reachable fixtures",
      "Thorough floor care",
      "Extra time on build-up and corners",
      "Recommended add-ons for appliances and windows",
    ],
    idealFor: [
      "First-time professional clean clients",
      "Seasonal resets and special events",
      "Homes that have gone without cleaning for a while",
    ],
    image:
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Close detail of bathroom fixtures after a deep clean",
    faqs: [
      {
        question: "How is deep cleaning different from house cleaning?",
        answer:
          "Deep cleaning allocates more time and covers detail areas that standard visits may lighten or skip, such as baseboards and heavier build-up.",
      },
      {
        question: "Should I deep clean before starting weekly service?",
        answer:
          "We recommend it. A deep clean establishes the baseline so maintenance visits stay efficient and results stay visible.",
      },
    ],
    relatedSlugs: ["house-cleaning", "move-out-move-in-cleaning", "maintenance-cleaning"],
  },
];

export function getServiceBySlug(slug: string): ServiceDef | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServiceById(id: ServiceTypeId): ServiceDef | undefined {
  return services.find((s) => s.id === id);
}
