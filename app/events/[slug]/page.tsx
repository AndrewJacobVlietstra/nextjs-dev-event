import { BASE_URL } from "@/lib/constants";
import { Event } from "@/lib/types";
import { notFound } from "next/navigation";

type EventDetailsPageProps = {
	params: Promise<{ slug: string }>;
};

const EventDetailsPage = async ({ params }: EventDetailsPageProps) => {
	const { slug } = await params;

	const request = await fetch(`${BASE_URL}/api/events/${slug}`);
	const { event }: { event: Event; message: string } = await request.json();

	if (!event) return notFound();

	return (
		<section id="event">
			<h1>Event: {slug}</h1>
		</section>
	);
};
export default EventDetailsPage;
