import connectDB from "@/lib/connectDB";
import Event from "@/models/Event";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = { params: Promise<{ slug: string }> };

export async function GET(
	req: NextRequest,
	{ params }: RouteParams
): Promise<NextResponse> {
	const { slug } = await params;

	// Validate slug is of proper data type
	if (!slug || typeof slug !== "string" || slug.trim() === "") {
		return NextResponse.json(
			{ message: "Invalid or missing slug" },
			{ status: 400 }
		);
	}

	// Sanitize slug, normalize it to match slug type in db
	const sanitizedSlug = slug.trim().toLowerCase();

	try {
		await connectDB();
		const event = await Event.findOne({ slug: sanitizedSlug });

		if (!event) {
			return NextResponse.json(
				{ message: `No event found with provided slug: ${sanitizedSlug}` },
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{ message: "Fetched event successfully", event },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "An unexpected error occurred", error },
			{ status: 500 }
		);
	}
}
