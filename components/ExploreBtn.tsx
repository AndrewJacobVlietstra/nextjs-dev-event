"use client";

import Image from "next/image";
import Link from "next/link";

const ExploreBtn = () => {
	return (
		<Link
			href="#events"
			className="flex-center mt-6 mx-auto gap-2"
			id="explore-btn"
		>
			<span>Explore Events</span>
			<Image
				alt="Arrow down symbol"
				src={"/icons/arrow-down.svg"}
				width={24}
				height={24}
			/>
		</Link>
	);
};
export default ExploreBtn;
