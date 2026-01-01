import EventDetails from "@/components/EventDetails";

type EventDetailsPageProps = {
	params: Promise<{ slug: string }>;
};

const EventDetailsPage = async ({ params }: EventDetailsPageProps) => {
	const { slug } = await params;

	return <EventDetails slug={slug} />;
};
export default EventDetailsPage;
