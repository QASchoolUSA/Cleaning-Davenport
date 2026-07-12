# Cleaning Davenport

SEO-first marketing site and booking calculator for **Cleaning Davenport** (Davenport, FL).

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion
- Static pages for services, areas, frequencies, and blog
- Live quote/booking calculator (`/book`) — **no upfront payment**

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Booking flow

Calculator posts to `POST /api/bookings` and stores JSON under `data/bookings/`.

**Booking Broom:** integration is intentionally deferred. See [`data/bookings/README.md`](data/bookings/README.md).

## Contact

- Email: info@cleaningdavenport.com
- Phone: add in `lib/site.ts` when available (`siteConfig.phone`)
