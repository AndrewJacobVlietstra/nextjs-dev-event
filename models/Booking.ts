import type { Booking } from "@/lib/types";
import mongoose from "mongoose";
import Event from "./Event";

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

// Pre-save hook to validate events exists before creating booking
BookingSchema.pre("save", async function () {
	const booking = this as Booking;

	// Only validate eventId if it's new or modified
	if (booking.isModified("eventId") || booking.isNew) {
		try {
			const eventExists = await Event.findById(booking.eventId).select("_id");

			if (!eventExists) {
				const error = new Error(
					`Event with ID ${booking.eventId} does not exist`
				);
				error.name = "ValidationError";
				return error;
			}
		} catch {
			const validationError = new Error(
				"Invalid events ID format or database error"
			);
			validationError.name = "ValidationError";
			return validationError;
		}
	}
});

// Create index on eventId for faster queries
BookingSchema.index({ eventId: 1 });

// Create compound index for common queries (events bookings by date)
BookingSchema.index({ eventId: 1, createdAt: -1 });

// Create index on email for user booking lookups
BookingSchema.index({ email: 1 });

// Enforce one booking per events per email
BookingSchema.index(
	{ eventId: 1, email: 1 },
	{ unique: true, name: "uniq_event_email" }
);

const Booking =
	mongoose.models.Booking || mongoose.model<Booking>("Booking", BookingSchema);

export default Booking;
