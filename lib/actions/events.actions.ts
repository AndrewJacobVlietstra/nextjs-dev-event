"use server";

import { cache } from "react";
import type { Event as TEvent } from "@/lib/types";
import Event from "@/models/Event";
import connectDB from "@/lib/connectDB";

export const getSimilarEvents = cache(async (event: TEvent) => {
	try {
		await connectDB();

		const similarEvents = await Event.find({
			_id: { $ne: event._id },
			tags: { $in: event.tags },
		}).lean();

		return similarEvents;
	} catch (error) {
		console.log(
			error instanceof Error
				? error.message
				: "Could not get similar events. Unknown error occurred."
		);

		return [];
	}
});
