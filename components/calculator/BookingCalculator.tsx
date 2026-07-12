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
import { useMemo, useState, type ReactNode } from "react";

const TIME_WINDOWS = [
  "Morning (8am–12pm)",
  "Afternoon (12pm–4pm)",
  "Evening (4pm–7pm)",
  "Flexible / any time",
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
  "w-full appearance-none rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-charcoal outline-none focus:border-teal";

const inputClass =
  "w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-teal";

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
    short: "Windows in",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="16" rx="1" />
        <path d="M12 4v16M3 12h18" />
      </svg>
    ),
  },
  "windows-exterior": {
    short: "Windows out",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="16" rx="1" />
        <path d="M12 4v16M3 12h18M17 2l2 2-2 2" />
      </svg>
    ),
  },
  laundry: {
    short: "Laundry",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <circle cx="12" cy="13" r="4" />
        <path d="M8 6h.01M11 6h2" />
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
    short: "Pet hair",
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
}: {
  compact?: boolean;
  defaultService?: ServiceTypeId;
  defaultFrequency?: FrequencyId;
}) {
  const [step, setStep] = useState<0 | 1>(0);
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

  if (success) {
    return (
      <div className="rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
          Request received
        </p>
        <h3 className="mt-2 font-display text-2xl text-charcoal sm:text-3xl">
          {success.intent === "book"
            ? "Your booking request is in"
            : "Your quote request is in"}
        </h3>
        <p className="mt-3 text-sm text-muted sm:text-base">
          Estimated total:{" "}
          <strong className="text-charcoal">{formatUSD(success.total)}</strong>
          . No payment due now — you pay after cleaning.
        </p>
        <button
          type="button"
          className="mt-5 rounded-full bg-teal px-5 py-3 text-sm font-semibold text-white hover:bg-teal-dark"
          onClick={() => {
            setSuccess(null);
            setStep(0);
            setForm({
              ...initial,
              serviceType: defaultService ?? initial.serviceType,
              frequency: defaultFrequency ?? initial.frequency,
            });
          }}
        >
          Start another quote
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm lg:grid lg:grid-cols-[1.35fr_0.85fr]">
      <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-line bg-gradient-to-r from-teal-light to-sky/70 px-4 py-3 lg:hidden">
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
          {breakdown.frequencyDiscount > 0
            ? ` · save ${formatUSD(breakdown.frequencyDiscount)}`
            : ""}
        </p>
      </div>

      <div className="flex max-h-[calc(100dvh-11rem)] flex-col md:max-h-none">
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-3 sm:px-6 sm:py-6 lg:overflow-visible">
          {step === 0 ? (
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
                    const v = e.target.value;
                    if (v === "custom") return;
                    update("sqft", Number(v));
                  }}
                >
                  {SQFT_PRESETS.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label} (~{p.value.toLocaleString()} sq ft)
                    </option>
                  ))}
                  {!SQFT_PRESETS.some((p) => p.value === form.sqft) ? (
                    <option value="custom">
                      Custom ({form.sqft.toLocaleString()} sq ft)
                    </option>
                  ) : null}
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
                    onChange={(e) =>
                      update("bathrooms", Number(e.target.value))
                    }
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
                  {(Object.keys(FREQUENCY_LABELS) as FrequencyId[]).map(
                    (id) => (
                      <option key={id} value={id}>
                        {FREQUENCY_LABELS[id]}
                        {FREQUENCY_DISCOUNT_LABELS[id]
                          ? ` (${FREQUENCY_DISCOUNT_LABELS[id]})`
                          : ""}
                      </option>
                    ),
                  )}
                </select>
              </SelectField>

              <div>
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-charcoal">Add-ons</p>
                  <p className="text-[11px] text-muted">
                    {form.addons.length === 0
                      ? "Tap to add"
                      : `+${formatUSD(breakdown.addons)}`}
                  </p>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {(Object.keys(ADDON_ICONS) as AddonId[]).map((id) => {
                    const selected = form.addons.includes(id);
                    const meta = ADDON_ICONS[id];
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => toggleAddon(id)}
                        aria-pressed={selected}
                        title={`${ADDON_META[id].label} (+${formatUSD(ADDON_PRICES[id])})`}
                        className={`flex flex-col items-center gap-1 rounded-xl border px-1 py-2 transition ${
                          selected
                            ? "border-teal bg-teal text-white shadow-sm"
                            : "border-line bg-cream/80 text-charcoal hover:border-teal/50"
                        }`}
                      >
                        <span className={selected ? "text-white" : "text-teal"}>
                          {meta.icon}
                        </span>
                        <span className="text-center text-[9px] font-semibold leading-tight sm:text-[10px]">
                          {meta.short}
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
                        className="inline-flex items-center gap-1.5 rounded-full bg-teal-light px-2.5 py-1 text-[11px] font-medium text-teal-dark"
                      >
                        <span className="inline-flex scale-75 text-teal">
                          {ADDON_ICONS[id].icon}
                        </span>
                        {ADDON_META[id].label}
                        <span className="text-teal">
                          +{formatUSD(ADDON_PRICES[id])}
                        </span>
                        <button
                          type="button"
                          aria-label={`Remove ${ADDON_META[id].label}`}
                          onClick={() => toggleAddon(id)}
                          className="ml-0.5 text-teal-dark/70 hover:text-teal-dark"
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <div className="hidden sm:block">
                <label className="mb-1.5 block text-xs font-semibold text-charcoal">
                  Fine-tune sq ft: {form.sqft.toLocaleString()}
                </label>
                <input
                  type="range"
                  min={400}
                  max={5000}
                  step={50}
                  value={form.sqft}
                  onChange={(e) => update("sqft", Number(e.target.value))}
                  className="w-full accent-teal"
                />
              </div>
            </div>
          ) : (
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
                  We will email your estimate. Schedule anytime — still no
                  upfront payment.
                </p>
              )}

              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold">Name</span>
                  <input
                    className={inputClass}
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    autoComplete="name"
                    required
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold">ZIP</span>
                  <input
                    className={inputClass}
                    value={form.zip}
                    onChange={(e) => update("zip", e.target.value)}
                    autoComplete="postal-code"
                    required
                  />
                </label>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold">
                    Email
                  </span>
                  <input
                    type="email"
                    className={inputClass}
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    autoComplete="email"
                    required
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold">
                    Phone
                  </span>
                  <input
                    type="tel"
                    className={inputClass}
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    autoComplete="tel"
                    required
                  />
                </label>
              </div>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold">
                  Address{" "}
                  <span className="font-normal text-muted">(optional)</span>
                </span>
                <input
                  className={inputClass}
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  autoComplete="street-address"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold">
                  Notes{" "}
                  <span className="font-normal text-muted">
                    (pets, gate code)
                  </span>
                </span>
                <input
                  className={inputClass}
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  placeholder="Optional"
                />
              </label>
            </div>
          )}

          {error ? (
            <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-700">
              {error}
            </p>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-line bg-white px-4 py-3 sm:px-6">
          {step === 1 ? (
            <button
              type="button"
              onClick={() => setStep(0)}
              className="rounded-full px-3 py-2.5 text-sm font-semibold text-muted"
            >
              Back
            </button>
          ) : (
            <span className="text-xs text-muted">No payment upfront</span>
          )}
          {step === 0 ? (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-dark"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              disabled={!canSubmit() || submitting}
              onClick={submit}
              className="rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-white hover:bg-coral-dark disabled:opacity-40"
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
          Estimate only — final price confirmed if the home differs from the
          details provided. <strong>Pay after cleaning</strong>, never upfront.
        </p>
      </aside>
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
