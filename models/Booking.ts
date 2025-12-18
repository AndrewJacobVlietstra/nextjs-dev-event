import type { Booking } from "@/lib/types";
import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema<Booking>(
	{
		eventId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Event",
			required: [true, "Event ID is required"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			trim: true,
			lowercase: true,
			validate: {
				validator: function (email: string) {
					// RFC 5322 compliant email validation regex
					const emailRegex =
						/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
					return emailRegex.test(email);
				},
				message: "Please provide a valid email address",
			},
		},
	},
	{
		timestamps: true, // Auto-generate createdAt and updatedAt
	}
);

const Booking =
	mongoose.models.Booking || mongoose.model<Booking>("Booking", BookingSchema);

export default Booking;
