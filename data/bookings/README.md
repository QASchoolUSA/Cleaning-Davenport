# Booking Broom Integration

Bookings from the website calculator currently POST to `/api/bookings` and are
stored as JSON files under `data/bookings/`.

When Booking Broom credentials are available:

1. Add env vars (example): `BOOKING_BROOM_API_KEY`, `BOOKING_BROOM_ENDPOINT`
2. Update `app/api/bookings/route.ts` to forward the validated payload
3. Keep the calculator request body shape stable so the UI does not need changes

Payload includes: serviceType, sqft, bedrooms, bathrooms, frequency, addons,
intent (`quote` | `book`), schedule fields, contact fields, and `estimate`.
