# Booking Broom Integration

Bookings from the website calculator POST to `/api/bookings`, are stored as
JSON under `data/bookings/`, and are forwarded to Booking Broom when credentials
are set.

## Env vars

| Variable | Required | Example |
|----------|----------|---------|
| `BOOKING_BROOM_URL` | for forward | `https://bookings.kedrik.com` or `http://localhost:3000` |
| `BOOKING_BROOM_API_KEY` | for forward | `bb_davenport_dev_key` (local) |
| `BOOKING_BROOM_SITE_SLUG` | optional | `davenport` (default) |

See `.env.example`. Without `BOOKING_BROOM_URL` / `BOOKING_BROOM_API_KEY`, the
route still accepts bookings and saves them locally (`bookingBroomStatus:
"pending_integration"`). When credentials are set and forward fails, the API
returns **502**.

## Payload

Calculator body stays camelCase. Server maps to Booking Broom snake_case
(`customer_name`, `service_type`, etc.), sends home and estimate details as the
structured `property`, `quote`, `intent` and `attribution` fields, and leaves
only the customer's message and the estimate breakdown in `notes`. See
`lib/booking-broom.ts`.
