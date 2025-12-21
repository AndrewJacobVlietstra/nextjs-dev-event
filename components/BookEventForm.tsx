"use client";

import { Types } from "mongoose";
import { createBooking } from "@/lib/actions/booking.actions";
import { FormEvent, useEffect, useState } from "react";

type BookEventFormProps = {
	eventId: Types.ObjectId | string;
	slug: string;
};

const BookEventForm = ({ eventId, slug }: BookEventFormProps) => {
	const [email, setEmail] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState({ isError: false, message: "" });

	// UseEffect to manage error timeout, clear timeout if new error occurs
	useEffect(() => {
		const errorTimeout = setTimeout(
			() => setError({ isError: false, message: "" }),
			5000
		);

		return () => clearTimeout(errorTimeout);
	}, [error]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			setIsPending(true);

			const { success, message } = await createBooking(email, eventId, slug);

			if (!success) {
				throw Error(message);
			}

			setSubmitted(true);
		} catch (error) {
			const message =
				error instanceof Error
					? error.message
					: "An error occurred, please try again.";
			setError({ isError: true, message });
		} finally {
			setIsPending(false);
		}
	};

	return (
		<div id="book-event">
			{submitted ? (
				<p className="text-sm">Thank you for signing up!</p>
			) : (
				<form className="relative" onSubmit={(e) => handleSubmit(e)}>
					<div>
						<input
							required
							id="email"
							type="email"
							name="email"
							className={error.isError ? "border-red-400" : ""}
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						/>
						<label htmlFor="email">
							{email.length > 0 ? "" : "Enter Your Email"}
						</label>
					</div>
					<button className="button-submit" disabled={isPending} type="submit">
						{isPending ? "Booking Event..." : "Book Event"}
					</button>
					{error.isError && (
						<p className="text-sm font-semibold">{error.message}</p>
					)}
				</form>
			)}
		</div>
	);
};
export default BookEventForm;
