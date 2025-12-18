import Image from "next/image";
import Link from "next/link";

type EventCardProps = {
	title: string;
	image: string;
	slug: string;
	location: string;
	date: string;
	time: string;
};

const EventCard = ({
	date,
	image,
	location,
	slug,
	time,
	title,
}: EventCardProps) => {
	return (
		<Link id="event-card" href={`/events/${slug}`}>
			<Image
				alt={title}
				src={image}
				className="poster"
				width={410}
				height={300}
			/>

			<div className="flex gap-2">
				<Image src={"/icons/pin.svg"} alt="location" width={14} height={14} />
				<p>{location}</p>
			</div>

			<p className="title">{title}</p>

			<div className="datetime">
				<div>
					<Image
						src={"/icons/calendar.svg"}
						alt="date"
						width={14}
						height={14}
					/>
					<p>{date}</p>
				</div>
				<div>
					<Image src={"/icons/clock.svg"} alt="time" width={14} height={14} />
					<p>{time}</p>
				</div>
			</div>
		</Link>
	);
};
export default EventCard;
