import Link from "next/link";

/** Mobile-only launch card — avoids nested scroll with an embedded calculator */
export function QuoteLaunchCard() {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-sm md:hidden">
      <div className="bg-gradient-to-br from-teal to-teal-dark px-5 py-8 text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mint">
          Instant estimate
        </p>
        <h3 className="mt-2 font-display text-3xl leading-tight">
          Get your quote in about a minute
        </h3>
        <p className="mt-3 text-sm text-white/80">
          Full-screen quote tool — no nested scrolling. Pay only after cleaning.
        </p>
        <Link
          href="/book"
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-coral py-3.5 text-sm font-semibold text-white hover:bg-coral-dark"
        >
          Open quote calculator
        </Link>
      </div>
      <ul className="grid grid-cols-3 divide-x divide-line text-center text-xs text-muted">
        <li className="px-2 py-3">
          <p className="font-semibold text-charcoal">Size + rooms</p>
          priced live
        </li>
        <li className="px-2 py-3">
          <p className="font-semibold text-charcoal">Add-ons</p>
          tap icons
        </li>
        <li className="px-2 py-3">
          <p className="font-semibold text-charcoal">No deposit</p>
          pay after
        </li>
      </ul>
    </div>
  );
}
