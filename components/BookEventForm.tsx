"use client";

import { FormEvent, useState } from "react";

const BookEventForm = () => {
	const [email, setEmail] = useState("");
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setTimeout(() => setSubmitted(true), 1000);
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
							// placeholder="Enter your email"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						/>
						<label htmlFor="email">
							{email.length > 0 ? "" : "Enter Your Email"}
						</label>
					</div>
					<button className="button-submit" type="submit">
						Book Event
					</button>
				</form>
			)}
		</div>
	);
};
export default BookEventForm;
