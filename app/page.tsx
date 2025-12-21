import Events from "@/components/Events";
import ExploreBtn from "@/components/ExploreBtn";
import HomeHeading from "@/components/HomeHeading";
import { BASE_URL } from "@/lib/constants";
import type { Event } from "@/lib/types";

const HomePage = async () => {
	const response = await fetch(`${BASE_URL}/api/events`, {
		next: { revalidate: 60 }, // revalidate every minute
	});
	const { events }: { events: Event[] } = await response.json();

	return (
		<section>
			<HomeHeading />
			<ExploreBtn />
			<Events events={events} heading="Featured Events" />
		</section>
	);
};
export default HomePage;
