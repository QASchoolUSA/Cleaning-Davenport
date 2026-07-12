"use client";

import {
  ADDON_META,
  ADDON_PRICES,
  FREQUENCY_DISCOUNT_LABELS,
  FREQUENCY_LABELS,
  SQFT_PRESETS,
  calculatePrice,
  formatUSD,
  type AddonId,
  type FrequencyId,
  type ServiceTypeId,
} from "@/lib/pricing";
import { services } from "@/lib/services";
import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";

const TIME_WINDOWS = [
  "Morning (8am–12pm)",
  "Afternoon (12pm–4pm)",
  "Evening (4pm–7pm)",
  "Flexible / any time",
] as const;

/** Mobile app flow — one short screen per step, no nested scroll */
const APP_STEPS = [
  "Service",
  "Home",
  "Schedule",
  "Add-ons",
  "Contact",
] as const;

type Intent = "quote" | "book";

interface FormState {
  serviceType: ServiceTypeId;
  sqft: number;
  bedrooms: number;
  bathrooms: number;
  frequency: FrequencyId;
  addons: AddonId[];
  intent: Intent;
  preferredDate: string;
  timeWindow: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  zip: string;
  notes: string;
}

const initial: FormState = {
  serviceType: "house",
  sqft: 1600,
  bedrooms: 3,
  bathrooms: 2,
  frequency: "bi-weekly",
  addons: [],
  intent: "book",
  preferredDate: "",
  timeWindow: TIME_WINDOWS[3],
  name: "",
  email: "",
  phone: "",
  address: "",
  zip: "",
  notes: "",
};

const selectClass =
  "w-full appearance-none rounded-xl border border-line bg-white px-3 py-3 text-base text-charcoal outline-none focus:border-teal";

const inputClass =
  "w-full rounded-xl border border-line bg-white px-3 py-3 text-base outline-none focus:border-teal";

const ADDON_ICONS: Record<AddonId, { short: string; icon: ReactNode }> = {
  "kitchen-deep": {
    short: "Kitchen",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 10h16v10H4zM8 10V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" />
        <path d="M9 14h.01M15 14h.01" />
      </svg>
    ),
  },
  oven: {
    short: "Oven",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M4 9h16M8 6h.01M12 6h.01" />
      </svg>
    ),
  },
  fridge: {
    short: "Fridge",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="6" y="2" width="12" height="20" rx="2" />
        <path d="M6 10h12M9 6v2M9 14v2" />
      </svg>
    ),
  },
  "windows-interior": {
    short: "Win in",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="16" rx="1" />
        <path d="M12 4v16M3 12h18" />
      </svg>
    ),
  },
  "windows-exterior": {
    short: "Win out",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="16" rx="1" />
        <path d="M12 4v16M3 12h18" />
      </svg>
    ),
  },
  laundry: {
    short: "Laundry",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
  },
  cabinets: {
    short: "Cabinets",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="16" rx="1" />
        <path d="M12 4v16M7 12h.01M17 12h.01" />
      </svg>
    ),
  },
  garage: {
    short: "Garage",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 10l9-6 9 6v10H3V10z" />
        <path d="M6 20v-6h12v6" />
      </svg>
    ),
  },
  balcony: {
    short: "Patio",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 20V10l8-5 8 5v10" />
        <path d="M4 14h16M8 14v6M16 14v6" />
      </svg>
    ),
  },
  pets: {
    short: "Pets",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <ellipse cx="12" cy="14" rx="5" ry="4" />
        <circle cx="7" cy="9" r="1.5" />
        <circle cx="17" cy="9" r="1.5" />
        <circle cx="9" cy="6.5" r="1.4" />
        <circle cx="15" cy="6.5" r="1.4" />
      </svg>
    ),
  },
};

export function BookingCalculator({
  defaultService,
  defaultFrequency,
  variant = "embedded",
}: {
  compact?: boolean;
  defaultService?: ServiceTypeId;
  defaultFrequency?: FrequencyId;
  /** `app` = full-screen mobile quote flow with short steps, no nested scroll */
  variant?: "embedded" | "app";
}) {
  const isApp = variant === "app";
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>({
    ...initial,
    serviceType: defaultService ?? initial.serviceType,
    frequency: defaultFrequency ?? initial.frequency,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{
    total: number;
    intent: Intent;
  } | null>(null);

  const totalSteps = isApp ? APP_STEPS.length : 2;
  const lastStep = totalSteps - 1;

  const breakdown = useMemo(
    () =>
      calculatePrice({
        serviceType: form.serviceType,
        sqft: form.sqft,
        bedrooms: form.bedrooms,
        bathrooms: form.bathrooms,
        frequency: form.frequency,
        addons: form.addons,
      }),
    [form],
  );

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleAddon(id: AddonId) {
    setForm((prev) => ({
      ...prev,
      addons: prev.addons.includes(id)
        ? prev.addons.filter((a) => a !== id)
        : [...prev.addons, id],
    }));
  }

  function canContinue() {
    if (!isApp) return true;
    if (step === 2 && form.intent === "book" && !form.preferredDate) return false;
    if (step === lastStep) {
      return (
        form.name.trim().length > 1 &&
        form.email.includes("@") &&
        form.phone.trim().length >= 7 &&
        form.zip.trim().length >= 5 &&
        (form.intent === "quote" || !!form.preferredDate)
      );
    }
    return true;
  }

  function canSubmit() {
    const contactOk =
      form.name.trim().length > 1 &&
      form.email.includes("@") &&
      form.phone.trim().length >= 7 &&
      form.zip.trim().length >= 5;
    if (form.intent === "book" && !form.preferredDate) return false;
    return contactOk;
  }

  async function submit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          estimate: breakdown,
          source: "website-calculator",
          // TODO: Booking Broom integration — forward payload when API credentials are provided
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setSuccess({ total: breakdown.total, intent: form.intent });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setSuccess(null);
    setStep(0);
    setForm({
      ...initial,
      serviceType: defaultService ?? initial.serviceType,
      frequency: defaultFrequency ?? initial.frequency,
    });
  }

  if (success) {
    return (
      <div
        className={
          isApp
            ? "flex h-dvh flex-col bg-cream px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]"
            : "rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-8"
        }
      >
        <div className="my-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
            Request received
          </p>
          <h3 className="mt-2 font-display text-3xl text-charcoal">
            {success.intent === "book"
              ? "Booking request sent"
              : "Quote request sent"}
          </h3>
          <p className="mt-3 text-muted">
            Estimated total:{" "}
            <strong className="text-charcoal">{formatUSD(success.total)}</strong>
            . Pay after cleaning — nothing due now.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <button
              type="button"
              className="rounded-full bg-teal px-5 py-3.5 text-sm font-semibold text-white"
              onClick={reset}
            >
              Start another quote
            </button>
            {isApp ? (
              <Link
                href="/"
                className="rounded-full border border-line bg-white px-5 py-3.5 text-center text-sm font-semibold text-charcoal"
              >
                Back to home
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  const progress = ((step + 1) / totalSteps) * 100;

  const shellClass = isApp
    ? "flex h-dvh flex-col overflow-hidden bg-cream"
    : "overflow-hidden rounded-2xl border border-line bg-white shadow-sm lg:grid lg:grid-cols-[1.35fr_0.85fr]";

  return (
    <div className={shellClass}>
      {/* Top bar */}
      <div
        className={
          isApp
            ? "shrink-0 border-b border-line bg-white px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))]"
            : "sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-line bg-gradient-to-r from-teal-light to-sky/70 px-4 py-3 lg:hidden"
        }
      >
        {isApp ? (
          <>
            <div className="mb-3 flex items-center justify-between gap-3">
              <Link
                href="/"
                className="text-sm font-semibold text-muted"
                aria-label="Close quote"
              >
                ← Close
              </Link>
              <p className="font-display text-lg text-teal">Quote</p>
              <p className="min-w-[4.5rem] text-right font-display text-xl text-charcoal">
                {formatUSD(breakdown.total)}
              </p>
            </div>
            <div className="mb-1 flex items-center justify-between text-[11px] font-semibold text-muted">
              <span>
                {step + 1}/{totalSteps} · {APP_STEPS[step]}
              </span>
              <span>
                {FREQUENCY_LABELS[form.frequency]}
                {form.addons.length > 0 ? ` · ${form.addons.length} add-on` : ""}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-teal-light">
              <div
                className="h-full rounded-full bg-teal transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-teal">
                Estimate · pay after
              </p>
              <p className="font-display text-2xl leading-none text-charcoal">
                {formatUSD(breakdown.total)}
              </p>
            </div>
            <p className="max-w-[45%] text-right text-xs text-muted">
              {FREQUENCY_LABELS[form.frequency]}
            </p>
          </>
        )}
      </div>

      <div
        className={
          isApp
            ? "flex min-h-0 flex-1 flex-col"
            : "flex max-h-[calc(100dvh-11rem)] flex-col md:max-h-none"
        }
      >
        {/* Content — app mode: no scroll, one screen */}
        <div
          className={
            isApp
              ? "flex min-h-0 flex-1 flex-col justify-center overflow-hidden px-4 py-4"
              : "min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-3 sm:px-6 sm:py-6 lg:overflow-visible"
          }
        >
          {isApp ? (
            <AppStep
              step={step}
              form={form}
              update={update}
              toggleAddon={toggleAddon}
              breakdownAddons={breakdown.addons}
            />
          ) : (
            <EmbeddedSteps
              step={step}
              form={form}
              update={update}
              toggleAddon={toggleAddon}
              breakdownAddons={breakdown.addons}
            />
          )}

          {error ? (
            <p className="mt-3 shrink-0 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-700">
              {error}
            </p>
          ) : null}
        </div>

        <div
          className={
            isApp
              ? "flex shrink-0 items-center justify-between gap-3 border-t border-line bg-white px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
              : "flex shrink-0 items-center justify-between gap-3 border-t border-line bg-white px-4 py-3 sm:px-6"
          }
        >
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className="rounded-full px-4 py-3 text-sm font-semibold text-muted"
            >
              Back
            </button>
          ) : (
            <span className="text-xs text-muted">Pay after cleaning</span>
          )}
          {step < lastStep ? (
            <button
              type="button"
              disabled={!canContinue()}
              onClick={() => setStep((s) => s + 1)}
              className="min-w-[8rem] rounded-full bg-teal px-6 py-3 text-sm font-semibold text-white disabled:opacity-40"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              disabled={!canSubmit() || submitting}
              onClick={submit}
              className="min-w-[8rem] rounded-full bg-coral px-6 py-3 text-sm font-semibold text-white disabled:opacity-40"
            >
              {submitting
                ? "Sending…"
                : form.intent === "book"
                  ? "Request booking"
                  : "Get my quote"}
            </button>
          )}
        </div>
      </div>

      {!isApp ? (
        <aside className="hidden border-l border-line bg-gradient-to-b from-teal-light/80 to-sky/50 p-6 lg:block">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
            Live estimate
          </p>
          <p className="mt-2 font-display text-5xl text-charcoal">
            {formatUSD(breakdown.total)}
          </p>
          <p className="mt-1 text-sm text-muted">
            {FREQUENCY_LABELS[form.frequency]}
            {breakdown.frequencyDiscount > 0
              ? ` · saves ${formatUSD(breakdown.frequencyDiscount)}`
              : ""}
          </p>
          <ul className="mt-5 space-y-2 text-sm text-muted">
            <li className="flex justify-between gap-3">
              <span>Base (size + service)</span>
              <span>{formatUSD(breakdown.base)}</span>
            </li>
            <li className="flex justify-between gap-3">
              <span>Bedrooms</span>
              <span>{formatUSD(breakdown.bedrooms)}</span>
            </li>
            <li className="flex justify-between gap-3">
              <span>Bathrooms</span>
              <span>{formatUSD(breakdown.bathrooms)}</span>
            </li>
            <li className="flex justify-between gap-3">
              <span>Add-ons</span>
              <span>{formatUSD(breakdown.addons)}</span>
            </li>
          </ul>
          <p className="mt-5 rounded-xl bg-white/70 px-3 py-3 text-xs leading-relaxed text-muted">
            Estimate only. <strong>Pay after cleaning</strong>, never upfront.
          </p>
        </aside>
      ) : null}
    </div>
  );
}

function AppStep({
  step,
  form,
  update,
  toggleAddon,
  breakdownAddons,
}: {
  step: number;
  form: FormState;
  update: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  toggleAddon: (id: AddonId) => void;
  breakdownAddons: number;
}) {
  if (step === 0) {
    return (
      <div className="space-y-3">
        <h2 className="font-display text-2xl text-charcoal">What do you need?</h2>
        <div className="grid grid-cols-2 gap-2">
          {services.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => update("serviceType", s.id)}
              className={`rounded-2xl border px-3 py-3.5 text-left text-sm font-semibold ${
                form.serviceType === s.id
                  ? "border-teal bg-teal text-white"
                  : "border-line bg-white text-charcoal"
              }`}
            >
              {s.shortName}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="space-y-4">
        <h2 className="font-display text-2xl text-charcoal">About your home</h2>
        <SelectField label="Size">
          <select
            className={selectClass}
            value={
              SQFT_PRESETS.some((p) => p.value === form.sqft)
                ? form.sqft
                : SQFT_PRESETS[2].value
            }
            onChange={(e) => update("sqft", Number(e.target.value))}
          >
            {SQFT_PRESETS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label} (~{p.value.toLocaleString()} sq ft)
              </option>
            ))}
          </select>
        </SelectField>
        <div className="grid grid-cols-2 gap-3">
          <SelectField label="Bedrooms">
            <select
              className={selectClass}
              value={form.bedrooms}
              onChange={(e) => update("bedrooms", Number(e.target.value))}
            >
              {Array.from({ length: 9 }, (_, i) => (
                <option key={i} value={i}>
                  {i === 0 ? "Studio" : i}
                </option>
              ))}
            </select>
          </SelectField>
          <SelectField label="Bathrooms">
            <select
              className={selectClass}
              value={form.bathrooms}
              onChange={(e) => update("bathrooms", Number(e.target.value))}
            >
              {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </SelectField>
        </div>
        <SelectField label="How often">
          <select
            className={selectClass}
            value={form.frequency}
            onChange={(e) => update("frequency", e.target.value as FrequencyId)}
          >
            {(Object.keys(FREQUENCY_LABELS) as FrequencyId[]).map((id) => (
              <option key={id} value={id}>
                {FREQUENCY_LABELS[id]}
                {FREQUENCY_DISCOUNT_LABELS[id]
                  ? ` · ${FREQUENCY_DISCOUNT_LABELS[id]}`
                  : ""}
              </option>
            ))}
          </select>
        </SelectField>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="space-y-4">
        <h2 className="font-display text-2xl text-charcoal">Booking or quote?</h2>
        <div className="grid gap-2">
          {(
            [
              ["book", "Request a booking", "Pick a preferred date"],
              ["quote", "Quote only", "Schedule later"],
            ] as const
          ).map(([id, title, sub]) => (
            <button
              key={id}
              type="button"
              onClick={() => update("intent", id)}
              className={`rounded-2xl border px-4 py-4 text-left ${
                form.intent === id
                  ? "border-teal bg-teal-light"
                  : "border-line bg-white"
              }`}
            >
              <p className="font-semibold text-charcoal">{title}</p>
              <p className="mt-0.5 text-sm text-muted">{sub}</p>
            </button>
          ))}
        </div>
        {form.intent === "book" ? (
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold">Date</span>
              <input
                type="date"
                value={form.preferredDate}
                onChange={(e) => update("preferredDate", e.target.value)}
                className={inputClass}
              />
            </label>
            <SelectField label="Time">
              <select
                className={selectClass}
                value={form.timeWindow}
                onChange={(e) => update("timeWindow", e.target.value)}
              >
                {TIME_WINDOWS.map((t) => (
                  <option key={t} value={t}>
                    {t.split(" (")[0]}
                  </option>
                ))}
              </select>
            </SelectField>
          </div>
        ) : null}
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="space-y-3">
        <div className="flex items-end justify-between gap-2">
          <h2 className="font-display text-2xl text-charcoal">Add-ons</h2>
          <p className="text-sm text-muted">
            {form.addons.length === 0
              ? "Optional"
              : `+${formatUSD(breakdownAddons)}`}
          </p>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {(Object.keys(ADDON_ICONS) as AddonId[]).map((id) => {
            const selected = form.addons.includes(id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => toggleAddon(id)}
                aria-pressed={selected}
                className={`flex flex-col items-center gap-1 rounded-2xl border px-1 py-3 ${
                  selected
                    ? "border-teal bg-teal text-white"
                    : "border-line bg-white text-charcoal"
                }`}
              >
                <span className={selected ? "text-white" : "text-teal"}>
                  {ADDON_ICONS[id].icon}
                </span>
                <span className="text-center text-[9px] font-semibold leading-tight">
                  {ADDON_ICONS[id].short}
                </span>
              </button>
            );
          })}
        </div>
        {form.addons.length > 0 ? (
          <p className="text-center text-xs text-muted">
            {form.addons.map((id) => ADDON_META[id].label).join(" · ")}
          </p>
        ) : (
          <p className="text-center text-xs text-muted">
            Tap icons to add — or skip
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="font-display text-2xl text-charcoal">Your details</h2>
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="mb-1 block text-xs font-semibold">Name</span>
          <input
            className={inputClass}
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            autoComplete="name"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-semibold">ZIP</span>
          <input
            className={inputClass}
            value={form.zip}
            onChange={(e) => update("zip", e.target.value)}
            autoComplete="postal-code"
            inputMode="numeric"
          />
        </label>
      </div>
      <label className="block">
        <span className="mb-1 block text-xs font-semibold">Email</span>
        <input
          type="email"
          className={inputClass}
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          autoComplete="email"
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-xs font-semibold">Phone</span>
        <input
          type="tel"
          className={inputClass}
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          autoComplete="tel"
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-xs font-semibold">
          Notes <span className="font-normal text-muted">(optional)</span>
        </span>
        <input
          className={inputClass}
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
          placeholder="Pets, gate code…"
        />
      </label>
    </div>
  );
}

function EmbeddedSteps({
  step,
  form,
  update,
  toggleAddon,
  breakdownAddons,
}: {
  step: number;
  form: FormState;
  update: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  toggleAddon: (id: AddonId) => void;
  breakdownAddons: number;
}) {
  if (step === 0) {
    return (
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal">
          Step 1 of 2 · Build quote
        </p>
        <SelectField label="Service type">
          <select
            className={selectClass}
            value={form.serviceType}
            onChange={(e) =>
              update("serviceType", e.target.value as ServiceTypeId)
            }
          >
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.shortName}
              </option>
            ))}
          </select>
        </SelectField>
        <SelectField label="Home size">
          <select
            className={selectClass}
            value={
              SQFT_PRESETS.some((p) => p.value === form.sqft)
                ? form.sqft
                : "custom"
            }
            onChange={(e) => {
              if (e.target.value === "custom") return;
              update("sqft", Number(e.target.value));
            }}
          >
            {SQFT_PRESETS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label} (~{p.value.toLocaleString()} sq ft)
              </option>
            ))}
          </select>
        </SelectField>
        <div className="grid grid-cols-2 gap-3">
          <SelectField label="Bedrooms">
            <select
              className={selectClass}
              value={form.bedrooms}
              onChange={(e) => update("bedrooms", Number(e.target.value))}
            >
              {Array.from({ length: 9 }, (_, i) => (
                <option key={i} value={i}>
                  {i === 0 ? "Studio / 0" : i}
                </option>
              ))}
            </select>
          </SelectField>
          <SelectField label="Bathrooms">
            <select
              className={selectClass}
              value={form.bathrooms}
              onChange={(e) => update("bathrooms", Number(e.target.value))}
            >
              {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </SelectField>
        </div>
        <SelectField label="How often">
          <select
            className={selectClass}
            value={form.frequency}
            onChange={(e) =>
              update("frequency", e.target.value as FrequencyId)
            }
          >
            {(Object.keys(FREQUENCY_LABELS) as FrequencyId[]).map((id) => (
              <option key={id} value={id}>
                {FREQUENCY_LABELS[id]}
                {FREQUENCY_DISCOUNT_LABELS[id]
                  ? ` (${FREQUENCY_DISCOUNT_LABELS[id]})`
                  : ""}
              </option>
            ))}
          </select>
        </SelectField>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <p className="text-xs font-semibold">Add-ons</p>
            <p className="text-[11px] text-muted">
              {form.addons.length === 0
                ? "Tap to add"
                : `+${formatUSD(breakdownAddons)}`}
            </p>
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {(Object.keys(ADDON_ICONS) as AddonId[]).map((id) => {
              const selected = form.addons.includes(id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleAddon(id)}
                  className={`flex flex-col items-center gap-1 rounded-xl border px-1 py-2 ${
                    selected
                      ? "border-teal bg-teal text-white"
                      : "border-line bg-cream/80"
                  }`}
                >
                  <span className={selected ? "text-white" : "text-teal"}>
                    {ADDON_ICONS[id].icon}
                  </span>
                  <span className="text-[9px] font-semibold">
                    {ADDON_ICONS[id].short}
                  </span>
                </button>
              );
            })}
          </div>
          {form.addons.length > 0 ? (
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {form.addons.map((id) => (
                <li
                  key={id}
                  className="inline-flex items-center gap-1 rounded-full bg-teal-light px-2.5 py-1 text-[11px] font-medium text-teal-dark"
                >
                  {ADDON_META[id].label} +{formatUSD(ADDON_PRICES[id])}
                  <button type="button" onClick={() => toggleAddon(id)}>
                    ×
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal">
        Step 2 of 2 · Contact & schedule
      </p>
      <SelectField label="What do you need?">
        <select
          className={selectClass}
          value={form.intent}
          onChange={(e) => update("intent", e.target.value as Intent)}
        >
          <option value="book">Request a booking date</option>
          <option value="quote">Quote only — schedule later</option>
        </select>
      </SelectField>
      {form.intent === "book" ? (
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold">
              Preferred date
            </span>
            <input
              type="date"
              value={form.preferredDate}
              onChange={(e) => update("preferredDate", e.target.value)}
              className={inputClass}
            />
          </label>
          <SelectField label="Time window">
            <select
              className={selectClass}
              value={form.timeWindow}
              onChange={(e) => update("timeWindow", e.target.value)}
            >
              {TIME_WINDOWS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </SelectField>
        </div>
      ) : (
        <p className="rounded-xl bg-sky/50 px-3 py-2 text-xs text-muted">
          We will email your estimate. No upfront payment.
        </p>
      )}
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold">Name</span>
          <input
            className={inputClass}
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold">ZIP</span>
          <input
            className={inputClass}
            value={form.zip}
            onChange={(e) => update("zip", e.target.value)}
          />
        </label>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold">Email</span>
          <input
            type="email"
            className={inputClass}
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold">Phone</span>
          <input
            type="tel"
            className={inputClass}
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold">
          Notes (optional)
        </span>
        <input
          className={inputClass}
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
        />
      </label>
    </div>
  );
}

function SelectField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-charcoal">
        {label}
      </span>
      {children}
    </label>
  );
}
