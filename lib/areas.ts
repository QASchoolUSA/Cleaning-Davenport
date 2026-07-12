export interface AreaDef {
  slug: string;
  name: string;
  headline: string;
  description: string;
  longContent: string[];
  neighborhoods: string[];
  faqs: { question: string; answer: string }[];
  image: string;
  imageAlt: string;
}

export const areas: AreaDef[] = [
  {
    slug: "davenport-fl",
    name: "Davenport, FL",
    headline: "Home cleaning trusted by Davenport residents",
    description:
      "Professional cleaning services throughout Davenport, Florida — houses, apartments, Airbnbs, and more. Get a quote online and pay after cleaning.",
    longContent: [
      "Davenport sits in one of Central Florida’s busiest corridors — close enough to the parks for weekend energy, settled enough for families who want quiet evenings at home. Cleaning Davenport was built for that mix: reliable local cleaning without the runaround of chasing quotes or paying before anyone has stepped through your door.",
      "We clean single-family homes, townhouses, apartments, and short-term rentals across Davenport. Whether you are off US-27, near Posner Park shopping, or tucked into a newer subdivision, our booking calculator gives you a clear estimate based on square footage, bedrooms, bathrooms, and the extras you actually want.",
      "Florida humidity, guest traffic, and busy school calendars all leave a mark on a home. Regular house cleaning or a deeper seasonal reset keeps bathrooms brighter and kitchens from falling behind. Airbnb hosts in Davenport lean on us for turnovers that protect reviews between checkouts and check-ins.",
      "When you search for house cleaning near you in Davenport, FL, you should find more than a phone number — you should find clear pricing logic, local coverage, and a booking flow that works on your phone. That is exactly what we built.",
    ],
    neighborhoods: [
      "Near Posner Park",
      "US-27 corridor",
      "Southern Davenport subdivisions",
      "Communities toward Champions Gate",
    ],
    faqs: [
      {
        question: "Do you only serve Davenport city limits?",
        answer:
          "Davenport is our home base, and we also serve nearby communities like Champions Gate, Posner Park area, Four Corners, Haines City, and more. Check our service areas page or request a quote with your ZIP.",
      },
      {
        question: "How do I book a cleaning in Davenport?",
        answer:
          "Use our online calculator to pick your service, home size, frequency, and add-ons. Request a booking or quote — no upfront payment required.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Suburban Florida-style home exterior in a sunny neighborhood",
  },
  {
    slug: "champions-gate",
    name: "Champions Gate",
    headline: "Cleaning for Champions Gate homes and rentals",
    description:
      "House, condo, and Airbnb cleaning for Champions Gate and nearby Davenport communities.",
    longContent: [
      "Champions Gate blends resort living with residential neighborhoods — which means cleaning needs range from family homes to high-turnover vacation properties. We serve the area with the same transparent quotes and pay-after-service model as our Davenport clients.",
      "Short-term rental hosts appreciate predictable turnover cleans. Full-time residents often prefer bi-weekly maintenance so the house stays guest-ready for relatives flying in for park trips. Either way, the calculator accounts for your square footage and add-ons like oven or fridge detail.",
      "Access instructions matter in gated communities. Include gate codes and parking notes when you book so our team arrives prepared and on time.",
    ],
    neighborhoods: ["Resort residences", "Gated communities", "Golf-course neighborhoods"],
    faqs: [
      {
        question: "Can you clean vacation rentals in Champions Gate?",
        answer:
          "Yes. Our Airbnb cleaning service is built for turnovers, with optional laundry help and checklist-style resets.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Modern resort-style residential home exterior",
  },
  {
    slug: "posner-park",
    name: "Posner Park Area",
    headline: "Convenient cleaning near Posner Park, Davenport",
    description:
      "Professional home cleaning for neighborhoods around Posner Park in Davenport, FL.",
    longContent: [
      "Living near Posner Park means errands are easy — cleaning should be too. We serve homes around this Davenport hub with flexible scheduling and online estimates you can finish in a few minutes on your phone.",
      "Busy retail-adjacent lifestyles often leave evenings short. A recurring maintenance clean keeps kitchens and baths from becoming the weekend chore pile. Deep cleans are available when the house needs a bigger reset after holidays or before hosting.",
      "Tell us your preferred time window and any pet notes. We will match you with a visit that fits your routine.",
    ],
    neighborhoods: ["Posner Park vicinity", "Nearby shopping-corridor homes"],
    faqs: [
      {
        question: "How fast can I get a quote near Posner Park?",
        answer:
          "Instantly through our booking calculator. Submit the form to request the date — we follow up to confirm.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Clean modern living room near suburban shopping areas",
  },
  {
    slug: "four-corners",
    name: "Four Corners",
    headline: "Four Corners home cleaning with clear pricing",
    description:
      "Cleaning services for the Four Corners area spanning Polk, Osceola, Orange, and Lake counties near Davenport.",
    longContent: [
      "Four Corners is one of Central Florida’s most practical places to live — and one of the easiest to outgrow your cleaning routine. We serve homes in the Four Corners area with house, apartment, deep, and Airbnb cleaning options.",
      "Because the area draws both full-time residents and vacation traffic, we see everything from weekly family cleans to move-out jobs between leases. Pricing always starts from your home’s size and selected extras, not a vague phone quote.",
      "If you are unsure whether your address falls in range, request a quote with your ZIP code and we will confirm coverage.",
    ],
    neighborhoods: ["Four Corners residential pockets", "Near US-27 / US-192"],
    faqs: [
      {
        question: "Is Four Corners in your service area?",
        answer:
          "Yes, we regularly serve Four Corners clients alongside Davenport. Share your address when booking so we can confirm travel and timing.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Spacious home living area after professional cleaning",
  },
  {
    slug: "kissimmee",
    name: "Kissimmee",
    headline: "Kissimmee cleaning support from a nearby Davenport team",
    description:
      "Select cleaning services for Kissimmee-area homes and rentals, coordinated from Cleaning Davenport.",
    longContent: [
      "Kissimmee’s mix of family neighborhoods and short-term rentals creates steady demand for dependable cleaners. We extend service into parts of the Kissimmee area for clients who want the same quote-first, pay-after approach we use in Davenport.",
      "Airbnb turnovers, deep cleans before guests arrive, and move-in refreshes are common requests. Use the calculator for an estimate, then note your Kissimmee address so we can confirm scheduling.",
      "Looking for something ongoing? Weekly and bi-weekly plans help vacation-heavy households stay ahead of sand, sunscreen residue, and guest traffic.",
    ],
    neighborhoods: ["Western Kissimmee approaches", "Near park-corridor rentals"],
    faqs: [
      {
        question: "Do you cover all of Kissimmee?",
        answer:
          "Coverage depends on exact location and schedule. Submit a quote request with your address and we will confirm availability.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cd00?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Florida home interior with bright natural light",
  },
  {
    slug: "winter-haven",
    name: "Winter Haven",
    headline: "Winter Haven home cleaning by Cleaning Davenport",
    description:
      "Professional cleaning for Winter Haven homeowners seeking reliable service from a nearby Central Florida team.",
    longContent: [
      "Winter Haven clients who want straightforward scheduling and honest estimates often reach out to Cleaning Davenport. We bring the same service menu — house, deep, move-related, and maintenance cleaning — with pricing tied to square footage and bathrooms, not guesswork.",
      "Chain of Lakes living means guests, humidity, and busy weeks. A bi-weekly plan keeps the house comfortable without a full deep clean every visit. When you need the bigger reset, book deep cleaning or add appliance interiors.",
      "Request a quote online and include your Winter Haven ZIP so we can align travel time with your preferred date.",
    ],
    neighborhoods: ["Winter Haven residential areas", "Nearby lake communities"],
    faqs: [
      {
        question: "Can I set up recurring cleaning in Winter Haven?",
        answer:
          "Yes, subject to schedule availability. Choose weekly, bi-weekly, or monthly in the calculator when you book.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Clean kitchen with island in a Florida home",
  },
  {
    slug: "haines-city",
    name: "Haines City",
    headline: "Haines City cleaning with Davenport-area reliability",
    description:
      "House and deep cleaning for Haines City homes, booked online with no upfront payment.",
    longContent: [
      "Haines City continues to grow, and so does the need for cleaners who show up when they say they will. Cleaning Davenport serves Haines City clients who want a modern booking experience and local accountability.",
      "From first-time deep cleans in a newly purchased home to maintenance schedules for established households, we price transparently and clean thoroughly. Move-out cleans are available when leases end or properties change hands.",
      "Use our calculator for a same-session estimate, then request the date that works for you.",
    ],
    neighborhoods: ["Haines City subdivisions", "Homes toward Davenport"],
    faqs: [
      {
        question: "What services are available in Haines City?",
        answer:
          "House cleaning, deep cleaning, move-in/out, maintenance, and related add-ons. Airbnb and post-construction are available based on schedule.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Tidy living room sofa area in a freshly cleaned home",
  },
];

export function getAreaBySlug(slug: string): AreaDef | undefined {
  return areas.find((a) => a.slug === slug);
}
