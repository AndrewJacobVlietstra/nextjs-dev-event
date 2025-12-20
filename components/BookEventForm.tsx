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
				<form onSubmit={(e) => handleSubmit(e)}>
					<div>
						<label htmlFor="email">Email Address</label>
						<input
							required
							id="email"
							type="email"
							name="email"
							placeholder="Enter your email"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						/>
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
