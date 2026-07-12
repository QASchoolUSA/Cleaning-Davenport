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
  phone: null as string | null, // Add when provided
  address: {
    city: "Davenport",
    state: "FL",
    region: "Central Florida",
    country: "US",
  },
  serviceAreaLabel: "Davenport, FL and nearby Central Florida communities",
  social: {
    // placeholders for future
  },
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
