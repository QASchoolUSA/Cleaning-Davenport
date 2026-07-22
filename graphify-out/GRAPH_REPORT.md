# Graph Report - Cleaning-Davenport  (2026-07-19)

## Corpus Check
- 52 files · ~47,337 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 250 nodes · 516 edges · 16 communities (11 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f290851f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- seo.tsx
- BookingCalculator.tsx
- site.ts
- compilerOptions
- services.ts
- package.json
- frequencies.ts
- devDependencies
- Cleaning Davenport
- layout.tsx
- AGENTS.md
- eslint.config.mjs
- next.config.ts
- postcss.config.mjs

## God Nodes (most connected - your core abstractions)
1. `pageTitle()` - 22 edges
2. `Breadcrumbs()` - 17 edges
3. `compilerOptions` - 16 edges
4. `CtaBand()` - 14 edges
5. `siteConfig` - 14 edges
6. `faqJsonLd()` - 13 edges
7. `breadcrumbJsonLd()` - 10 edges
8. `formatUSD()` - 9 edges
9. `JsonLd()` - 9 edges
10. `services` - 9 edges

## Surprising Connections (you probably didn't know these)
- `FaqPage()` --calls--> `faqJsonLd()`  [EXTRACTED]
  app/faq/page.tsx → lib/seo.tsx
- `HomePage()` --calls--> `faqJsonLd()`  [EXTRACTED]
  app/page.tsx → lib/seo.tsx
- `PricingPage()` --calls--> `formatUSD()`  [EXTRACTED]
  app/pricing/page.tsx → lib/pricing.ts
- `FrequencyPageView()` --calls--> `breadcrumbJsonLd()`  [EXTRACTED]
  components/FrequencyPageView.tsx → lib/seo.tsx
- `FrequencyPageView()` --calls--> `faqJsonLd()`  [EXTRACTED]
  components/FrequencyPageView.tsx → lib/seo.tsx

## Import Cycles
- None detected.

## Communities (16 total, 5 thin omitted)

### Community 0 - "seo.tsx"
Cohesion: 0.13
Nodes (23): AreaPage(), generateMetadata(), metadata, BlogPostPage(), generateMetadata(), FaqPage(), metadata, HomePage() (+15 more)

### Community 1 - "BookingCalculator.tsx"
Cohesion: 0.10
Nodes (37): POST(), metadata, PricingPage(), ADDON_ICONS, APP_STEPS, AppStep(), BookingCalculator(), EmbeddedSteps() (+29 more)

### Community 2 - "site.ts"
Cohesion: 0.13
Nodes (16): fraunces, metadata, RootLayout(), sourceSans, homeHowTo, Footer(), Header(), MobileStickyCta() (+8 more)

### Community 3 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 4 - "services.ts"
Cohesion: 0.09
Nodes (16): metadata, processSteps, metadata, metadata, metadata, metadata, metadata, metadata (+8 more)

### Community 5 - "package.json"
Cohesion: 0.11
Nodes (17): framer-motion, next, dependencies, framer-motion, next, react, react-dom, name (+9 more)

### Community 6 - "frequencies.ts"
Cohesion: 0.17
Nodes (9): metadata, metadata, metadata, metadata, FrequencyPageView(), QuoteLaunchCard(), FrequencyPage, frequencyPages (+1 more)

### Community 7 - "devDependencies"
Cohesion: 0.12
Nodes (17): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node (+9 more)

### Community 8 - "Cleaning Davenport"
Cohesion: 0.20
Nodes (8): Booking Broom Integration, Env vars, Payload, Booking flow, Cleaning Davenport, Contact, Develop, Stack

## Knowledge Gaps
- **86 isolated node(s):** `metadata`, `processSteps`, `metadata`, `metadata`, `metadata` (+81 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `pageTitle()` connect `seo.tsx` to `BookingCalculator.tsx`, `services.ts`, `frequencies.ts`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Why does `siteConfig` connect `site.ts` to `seo.tsx`, `BookingCalculator.tsx`, `services.ts`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Why does `Breadcrumbs()` connect `services.ts` to `seo.tsx`, `BookingCalculator.tsx`, `frequencies.ts`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **What connects `metadata`, `processSteps`, `metadata` to the rest of the system?**
  _86 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `seo.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1319073083778966 - nodes in this community are weakly interconnected._
- **Should `BookingCalculator.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09856035437430787 - nodes in this community are weakly interconnected._
- **Should `site.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13054187192118227 - nodes in this community are weakly interconnected._