# Cleaning Davenport

SEO-first marketing site and booking calculator for **Cleaning Davenport** (Davenport, FL).

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion
- Static pages for services, areas, frequencies, and blog
- Live quote/booking calculator (`/book`) — **no upfront payment**

## Develop

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Booking flow

Calculator posts to `POST /api/bookings`. Requests are saved under `data/bookings/`
and forwarded to **Booking Broom** when `BOOKING_BROOM_URL` and
`BOOKING_BROOM_API_KEY` are set (see `.env.example` and
[`data/bookings/README.md`](data/bookings/README.md)).

Local Booking Broom testing:

```
BOOKING_BROOM_URL=http://localhost:3000
BOOKING_BROOM_API_KEY=bb_davenport_dev_key
```

Site slug: `davenport` · admin email: `info@cleaningdavenport.com`

## Contact

- Email: info@cleaningdavenport.com
- Phone: add in `lib/site.ts` when available (`siteConfig.phone`)
