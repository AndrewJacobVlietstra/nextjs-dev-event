"use client";

import Image from "next/image";

const ExploreBtn = () => {
	return (
		<button
			className="mt-6 mx-auto"
			id="explore-btn"
			type="button"
			onClick={() => {}}
		>
			<a href="#events">
				Explore Events
				<Image
					alt="Arrow down symbol"
					src={"/icons/arrow-down.svg"}
					width={24}
					height={24}
				/>
			</a>
		</button>
	);
};
export default ExploreBtn;
