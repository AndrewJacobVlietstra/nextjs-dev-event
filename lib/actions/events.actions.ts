"use server";

import type { Event as TEvent } from "../types";
import Event from "@/models/Event";
import connectDB from "../connectDB";

export const getSimilarEvents = async (event: TEvent) => {
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
};
