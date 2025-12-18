import Events from "@/components/Events";
import ExploreBtn from "@/components/ExploreBtn";
import HomeHeading from "@/components/HomeHeading";
import { BASE_URL } from "@/lib/constants";

const HomePage = async () => {
	const response = await fetch(`${BASE_URL}/api/events`);
	const { events } = await response.json();

	return (
		<section>
			<HomeHeading />
			<ExploreBtn />
			<Events events={events} heading="Featured Events" />
		</section>
	);
};
export default HomePage;
