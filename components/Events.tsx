import { Event } from "@/lib/types";
import EventCard from "./EventCard";

type EventsProps = {
	heading?: string;
	events: Event[];
};

const Events = ({ heading, events }: EventsProps) => {
	if (!events || events.length === 0) return null;

	return (
		<div id="events" className="mt-20 space-y-7">
			{heading && <h3>{heading}</h3>}

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
