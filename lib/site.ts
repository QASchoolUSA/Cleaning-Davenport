export const siteConfig = {
  name: "Cleaning Davenport",
  legalName: "Cleaning Davenport",
  tagline: "Reliable home cleaning across Davenport, FL — pay after the job is done.",
  description:
    "Professional house, apartment, Airbnb, move-in/out, deep, and post-construction cleaning in Davenport, FL. Easy online quotes. No upfront payment.",
  url: "https://cleaningdavenport.com",
  email: "info@cleaningdavenport.com",
  /** Booking Broom site_slug */
  bookingSlug: "davenport",
  phone: null as string | null, // Add when a real number is assigned
  address: {
    city: "Davenport",
    state: "FL",
    region: "Central Florida",
    country: "US",
  },
  serviceAreaLabel: "Davenport, FL and nearby Central Florida communities",
  serviceAreaPolicy:
    "Cleaning Davenport is a mobile, service-area business. We do not publish a public storefront address.",
  /** Verified profile URLs only — empty until profiles exist */
  sameAs: [] as readonly string[],
  logoPath: "/favicon.ico",
  ogImagePath: "/og-default.png",
  social: {} as Record<string, string>,
} as const;

export const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/service-areas", label: "Areas" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;
