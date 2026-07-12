import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import {
  forwardToBookingBroom,
  isBookingBroomConfigured,
  type CalculatorBookingBody,
} from "@/lib/booking-broom";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CalculatorBookingBody;

    if (!body?.name || !body?.email || !body?.phone || !body?.zip) {
      return NextResponse.json(
        { error: "Name, email, phone, and ZIP are required." },
        { status: 400 },
      );
    }

    const localId = `bk_${Date.now()}`;
    const configured = isBookingBroomConfigured();

    let bookingBroomStatus: "pending_integration" | "forwarded" | "failed" =
      configured ? "failed" : "pending_integration";
    let bookingBroomId: string | undefined;
    let bookingBroomError: string | undefined;

    if (configured) {
      const result = await forwardToBookingBroom(body, localId);
      if (result.forwarded) {
        bookingBroomStatus = "forwarded";
        bookingBroomId = result.id;
      } else {
        bookingBroomStatus = "failed";
        bookingBroomError = result.error ?? "Forward to Booking Broom failed";
      }
    }

    const record = {
      id: localId,
      receivedAt: new Date().toISOString(),
      bookingBroomStatus,
      bookingBroomId,
      bookingBroomError,
      ...body,
    };

    const dir = path.join(process.cwd(), "data", "bookings");
    await mkdir(dir, { recursive: true });
    await writeFile(
      path.join(dir, `${record.id}.json`),
      JSON.stringify(record, null, 2),
      "utf8",
    );

    console.log(
      "[booking]",
      record.id,
      record.email,
      record.estimate?.total,
      bookingBroomStatus,
    );

    if (configured && bookingBroomStatus === "failed") {
      return NextResponse.json(
        {
          error:
            "Could not reach the booking service. Please try again or email us.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      id: bookingBroomId ?? localId,
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
