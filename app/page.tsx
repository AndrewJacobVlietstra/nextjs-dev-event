import Events from "@/components/Events";
import ExploreBtn from "@/components/ExploreBtn";
import HomeHeading from "@/components/HomeHeading";

const HomePage = () => {
	return (
		<section>
			<HomeHeading />
			<ExploreBtn />
			<Events title="Featured Events" />
		</section>
	);
};
export default HomePage;
