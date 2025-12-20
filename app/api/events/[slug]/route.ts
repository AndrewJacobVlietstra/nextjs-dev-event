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
		const event = await Event.findOne({ slug: sanitizedSlug }).lean();

		if (!event) {
			return NextResponse.json(
				{ message: `No event found with provided slug: ${slug}` },
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{ message: "Event fetched successfully", event },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				message: "Event fetch failed",
				error:
					error instanceof Error
						? error.message
						: "Unexpected server error occurred",
			},
			{ status: 500 }
		);
	}
}
