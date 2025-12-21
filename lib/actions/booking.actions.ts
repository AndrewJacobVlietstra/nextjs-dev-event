"use server";

import { Types } from "mongoose";
import Booking from "@/models/Booking";
import connectDB from "@/lib/connectDB";

export const createBooking = async (
	email: string,
	eventId: string | Types.ObjectId,
	slug: string
) => {
	try {
		await connectDB();

		// Check if user already booked this event
		const existingBooking = await Booking.findOne({
			email,
			eventId,
			slug,
		}).lean();

		if (existingBooking) {
			return { success: false, message: "You have already booked this event!" };
		}

		await Booking.create({ email, eventId, slug });

		return { success: true, message: "Booking created successfully!" };
	} catch (error) {
		console.log("Booking creation failed");
		return {
			success: false,
			message:
				error instanceof Error ? error.message : "Unknown error occurred.",
		};
	}
};

export const getBookingsByEventId = async (
	eventId: string | Types.ObjectId
) => {
	try {
		await connectDB();

		const bookings = await Booking.find({ eventId });

		return bookings.length;
	} catch (error) {
		console.log(error);
	}
};
