import Link from "next/link";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`mb-8 max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-teal">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl text-charcoal sm:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function CtaBand({
  title = "Ready for a cleaner home?",
  description = "Get an instant estimate in minutes. No upfront payment — you pay after the cleaning is done.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="relative overflow-hidden rounded-[2rem] bg-teal px-6 py-12 text-white sm:px-12">
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-16 left-10 h-56 w-56 rounded-full bg-mint/20" />
        <div className="relative max-w-xl">
          <h2 className="font-display text-3xl sm:text-4xl">{title}</h2>
          <p className="mt-3 text-base text-white/80 sm:text-lg">{description}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/book"
              className="rounded-full bg-coral px-6 py-3 text-sm font-semibold text-white hover:bg-coral-dark"
            >
              Open booking calculator
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FaqList({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-white">
      {items.map((item) => (
        <details key={item.question} className="group px-5 py-4">
          <summary className="cursor-pointer list-none font-semibold text-charcoal marker:content-none [&::-webkit-details-marker]:hidden">
            <div className="flex items-start justify-between gap-4">
              <span>{item.question}</span>
              <span className="mt-0.5 text-teal transition group-open:rotate-45">+</span>
            </div>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}

export function ReviewCard({
  name,
  area,
  text,
  rating = 5,
}: {
  name: string;
  area: string;
  text: string;
  rating?: number;
}) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-line bg-white p-6">
      <div className="mb-3 text-coral" aria-label={`${rating} out of 5 stars`}>
        {"★".repeat(rating)}
      </div>
      <blockquote className="flex-1 text-sm leading-relaxed text-muted sm:text-base">
        “{text}”
      </blockquote>
      <figcaption className="mt-4 text-sm font-semibold text-charcoal">
        {name}{" "}
        <span className="font-normal text-muted">· {area}</span>
      </figcaption>
    </figure>
  );
}

export function Breadcrumbs({
  items,
  light = false,
}: {
  items: { label: string; href?: string }[];
  light?: boolean;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`mb-6 text-sm ${light ? "text-white/70" : "text-muted"}`}
    >
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-2">
            {i > 0 ? <span aria-hidden>/</span> : null}
            {item.href ? (
              <Link
                href={item.href}
                className={light ? "hover:text-white" : "hover:text-teal"}
              >
                {item.label}
              </Link>
            ) : (
              <span className={light ? "text-white" : "text-charcoal"}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
