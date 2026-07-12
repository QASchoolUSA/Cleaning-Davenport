import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

/**
 * Booking intake stub.
 * TODO(Booking Broom): When credentials/docs are provided, forward the validated
 * payload to the Booking Broom API/webhook instead of (or in addition to)
 * local storage. Keep the same request shape so the calculator UI does not change.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body?.name || !body?.email || !body?.phone || !body?.zip) {
      return NextResponse.json(
        { error: "Name, email, phone, and ZIP are required." },
        { status: 400 },
      );
    }

    const record = {
      id: `bk_${Date.now()}`,
      receivedAt: new Date().toISOString(),
      bookingBroomStatus: "pending_integration",
      ...body,
    };

    const dir = path.join(process.cwd(), "data", "bookings");
    await mkdir(dir, { recursive: true });
    await writeFile(
      path.join(dir, `${record.id}.json`),
      JSON.stringify(record, null, 2),
      "utf8",
    );

    console.log("[booking]", record.id, record.email, record.estimate?.total);

    return NextResponse.json({
      ok: true,
      id: record.id,
      message:
        "Request received. No payment due now — we will follow up to confirm.",
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to save booking request." },
      { status: 500 },
    );
  }
}
