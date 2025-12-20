import connectDB from "@/lib/connectDB";
import Event from "@/models/Event";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export async function POST(req: NextRequest) {
	try {
		await connectDB();
		const formData = await req.formData();

		let event;

		try {
			event = Object.fromEntries(formData.entries());
			event.agenda = JSON.parse(formData.get("agenda") as string);
			event.tags = JSON.parse(formData.get("tags") as string);
			event.image = "https://dummyImage.com/dummyimage"; // placeholder img URL to pass validation

			// Validate all event data except image against schema before proceeding to upload image
			await Event.validate(event);
		} catch (error) {
			console.log(error);
			return NextResponse.json(
				{
					message: "Invalid JSON data format",
					error:
						error instanceof Error ? error.message : "Unknown error occurred",
				},
				{ status: 400 }
			);
		}

		// Image validation and upload - START
		const file = formData.get("image") as File;

		if (!file || typeof file === "string") {
			return NextResponse.json(
				{ message: "Image file is required" },
				{ status: 400 }
			);
		}

		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		const uploadResult = await new Promise((resolve, reject) => {
			cloudinary.uploader
				.upload_stream(
					{
						resource_type: "image",
						folder: "DevEvent",
					},
					(error, response) => {
						if (error) return reject(error);
						resolve(response);
					}
				)
				.end(buffer);
		});
		// Image validation and upload - END

		// Overwrite placeholder img URL from earlier with uploaded img secure url
		event.image = (uploadResult as { secure_url: string }).secure_url;

		const createdEvent = await Event.create(event);
		return NextResponse.json(
			{
				message: "Event created successfully",
				event: createdEvent,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{
				message: "Event creation failed",
				error:
					error instanceof Error
						? error.message
						: "Unknown server error occurred",
			},
			{ status: 500 }
		);
	}
}

export async function GET() {
	try {
		await connectDB();

		const events = await Event.find().sort({ createdAt: "descending" });

		return NextResponse.json(
			{
				message: "Events fetched successfully",
				events,
			},
			{
				status: 200,
			}
		);
	} catch (error) {
		return NextResponse.json(
			{
				message: "Events fetch failed",
				error:
					error instanceof Error
						? error.message
						: "Unexpected server error occurred",
			},
			{ status: 500 }
		);
	}
}
