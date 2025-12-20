import BookEventForm from "./BookEventForm";

type BookEventProps = {
	bookings: number;
};

const BookEvent = ({ bookings }: BookEventProps) => {
	const isNumber = typeof bookings === "number";
	const isEmpty = bookings <= 0;
	const isNonEmpty = bookings > 0;
	const isSingular = bookings === 1;

	return (
		<aside className="booking">
			<div className="signup-card">
				<h2>Book Your Spot</h2>
				{isEmpty && <p className="text-sm">Be the first to book your spot!</p>}
				{isNumber && isNonEmpty && (
					<p className="text-sm">
						<span>
							Join {bookings} {isSingular ? "person" : "people"} who{" "}
							{isSingular ? "has" : "have"} already booked their spot!
						</span>
					</p>
				)}

				<BookEventForm />
			</div>
		</aside>
	);
};
export default BookEvent;
