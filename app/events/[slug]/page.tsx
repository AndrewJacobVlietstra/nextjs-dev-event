import { notFound } from "next/navigation";
import { BASE_URL } from "@/lib/constants";
import { Event } from "@/lib/types";
import Image from "next/image";
import BookEvent from "@/components/BookEvent";
import { getSimilarEvents } from "@/lib/actions/events.actions";
import Events from "@/components/Events";

type EventDetailItemProps = {
	icon: string;
	alt: string;
	label: string;
};

type EventAgendaProps = {
	agendaItems: string[];
};

type EventTagsProps = {
	tags: string[];
};

type EventDetailsPageProps = {
	params: Promise<{ slug: string }>;
};

const EventDetailItem = ({ icon, alt, label }: EventDetailItemProps) => {
	return (
		<div className="flex gap-2 items-center">
			<Image src={icon} alt={alt} width={17} height={17} />
			<p>{label}</p>
		</div>
	);
};

const EventAgenda = ({ agendaItems }: EventAgendaProps) => {
	return (
		<div className="agenda">
			<h2>Agenda</h2>
			<ul>
				{agendaItems.map((item) => (
					<li key={item}>{item}</li>
				))}
			</ul>
		</div>
	);
};

const EventTags = ({ tags }: EventTagsProps) => {
	return (
		<div className="flex flex-wrap gap-1.5">
			{tags.map((tag) => (
				<div key={tag} className="pill">
					{tag}
				</div>
			))}
		</div>
	);
};

const EventDetailsPage = async ({ params }: EventDetailsPageProps) => {
	const { slug } = await params;

	const request = await fetch(`${BASE_URL}/api/events/${slug}`);
	const { event }: { event: Event | null | undefined; message: string } =
		await request.json();

	if (!event) return notFound();

	const similarEvents: Event[] = await getSimilarEvents(event);
	console.log(similarEvents);

	const {
		agenda,
		audience,
		date,
		description,
		image,
		location,
		mode,
		organizer,
		overview,
		tags,
		title,
		time,
		venue,
	} = event;

	const bookings = 26;

	return (
		<section id="event">
			<div className="header">
				<h2>{title}</h2>
				<p>{description}</p>
			</div>

			<div className="details">
				{/* Left side - Event Content */}
				<div className="content">
					<Image
						alt="Event Banner"
						className="banner"
						src={image}
						width={800}
						height={800}
					/>

					<section className="flex flex-col gap-2">
						<h2>Overview</h2>
						<p>{overview}</p>
					</section>

					<section className="flex flex-col gap-2">
						<h2>Event Details</h2>
						<EventDetailItem
							alt="Location icon"
							icon="/icons/pin.svg"
							label={`${venue} - ${location}`}
						/>
						<EventDetailItem
							alt="Calendar icon"
							icon="/icons/calendar.svg"
							label={date}
						/>
						<EventDetailItem
							alt="Time icon"
							icon="/icons/clock.svg"
							label={time}
						/>
						<EventDetailItem
							alt="Mode icon"
							icon="/icons/mode.svg"
							label={mode}
						/>
						<EventDetailItem
							alt="Audience icon"
							icon="/icons/audience.svg"
							label={audience}
						/>
					</section>

					<EventAgenda agendaItems={agenda} />

					<section className="flex flex-col gap-2">
						<h2>About the Organizer</h2>
						<p>{organizer}</p>
					</section>

					<EventTags tags={tags} />
				</div>

				{/* Right side - Booking Form */}
				<BookEvent bookings={bookings} />
			</div>

			<div className="flex w-full flex-col gap-4 pt-20">
				{/* <Events heading="Similar Events" events={similarEvents} /> */}
			</div>
		</section>
	);
};
export default EventDetailsPage;
