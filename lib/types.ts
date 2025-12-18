import mongoose from "mongoose";

export type Event = {
	title: string;
	slug: string;
	description: string;
	overview: string;
	image: string;
	venue: string;
	location: string;
	date: string;
	time: string;
	mode: string;
	organizer: string;
	audience: string;
	agenda: string[];
	tags: string[];
	createdAt: Date;
	updatedAt: Date;
};

export type Booking = {
	eventId: mongoose.Types.ObjectId;
	email: string;
	createdAt: Date;
	updatedAt: Date;
};
