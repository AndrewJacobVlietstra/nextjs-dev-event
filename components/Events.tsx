import EventCard from "./EventCard";
import { events } from "@/lib/constants";

type EventsProps = {
	title?: string;
};

const Events = ({ title }: EventsProps) => {
	return (
		<div className="mt-20 space-y-7">
			<h3>{title ?? ""}</h3>

			<ul className="events">
				{events.map((event) => (
					<li key={event.title}>
						<EventCard {...event} />
					</li>
				))}
			</ul>
		</div>
	);
};
export default Events;
