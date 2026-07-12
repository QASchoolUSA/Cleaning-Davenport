import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-start px-4 py-24 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">
        404
      </p>
      <h1 className="mt-2 font-display text-4xl text-charcoal">
        Page not found
      </h1>
      <p className="mt-3 text-muted">
        That link may be outdated. Head home or get a cleaning quote instead.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="rounded-full bg-teal px-5 py-3 text-sm font-semibold text-white hover:bg-teal-dark"
        >
          Go home
        </Link>
        <Link
          href="/book"
          className="rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-charcoal hover:border-teal"
        >
          Get a quote
        </Link>
      </div>
    </div>
  );
}
