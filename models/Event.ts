import type { Event } from "@/lib/types";
import mongoose from "mongoose";

const EventSchema = new mongoose.Schema<Event>(
	{
		title: {
			type: String,
			required: [true, "Title is required"],
			trim: true,
			maxlength: [100, "Title cannot exceed 100 characters"],
		},
		slug: {
			type: String,
			unique: true,
			lowercase: true,
			trim: true,
		},
		description: {
			type: String,
			required: [true, "Description is required"],
			trim: true,
			maxlength: [1000, "Description cannot exceed 1000 characters"],
		},
		overview: {
			type: String,
			required: [true, "Overview is required"],
			trim: true,
			maxlength: [500, "Overview cannot exceed 500 characters"],
		},
		image: {
			type: String,
			required: [true, "Image URL is required"],
			trim: true,
		},
		venue: {
			type: String,
			required: [true, "Venue is required"],
			trim: true,
		},
		location: {
			type: String,
			required: [true, "Location is required"],
			trim: true,
		},
		date: {
			type: String,
			required: [true, "Date is required"],
		},
		time: {
			type: String,
			required: [true, "Time is required"],
		},
		mode: {
			type: String,
			required: [true, "Mode is required"],
			enum: {
				values: ["online", "offline", "hybrid"],
				message: "Mode must be either online, offline, or hybrid",
			},
		},
		organizer: {
			type: String,
			required: [true, "Organizer is required"],
			trim: true,
		},
		audience: {
			type: String,
			required: [true, "Audience is required"],
			trim: true,
		},
		agenda: {
			type: [String],
			required: [true, "Agenda is required"],
			validate: {
				validator: (v: string[]) => v.length > 0,
				message: "At least one agenda item is required",
			},
		},
		tags: {
			type: [String],
			required: [true, "Tags are required"],
			validate: {
				validator: (v: string[]) => v.length > 0,
				message: "At least one tag is required",
			},
		},
	},
	{
		timestamps: true, // Auto-generate createdAt and updatedAt
	}
);

// 2 - Create Model based off of Schema
const Event =
	mongoose.models.Event || mongoose.model<Event>("Event", EventSchema);

export default Event;
