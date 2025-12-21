import Events from "@/components/Events";
import ExploreBtn from "@/components/ExploreBtn";
import HomeHeading from "@/components/HomeHeading";
import { BASE_URL } from "@/lib/constants";
import { cacheLife } from "next/cache";
import type { Event } from "@/lib/types";

const HomePage = async () => {
	"use cache";
	cacheLife("hours");
	const response = await fetch(`${BASE_URL}/api/events`);
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
