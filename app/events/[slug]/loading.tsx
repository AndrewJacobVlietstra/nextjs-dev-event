import Skeleton from "@/components/Skeleton";

const EventDetailsLoading = () => {
	return (
		<div>
			<div className="mb-10">
				<Skeleton className="w-full lg:w-[65%] h-25" />
			</div>

			<div className="flex flex-col lg:flex-row gap-8">
				<div className="flex flex-col gap-y-8 w-full lg:w-2/3">
					<Skeleton className="w-full h-100" />
					<Skeleton className="w-full h-45" />
					<Skeleton className="w-full h-45" />
					<Skeleton className="w-full h-45" />
				</div>
				<div className="w-full lg:w-1/3">
					<Skeleton className="w-full h-72" />
				</div>
			</div>
		</div>
	);
};
export default EventDetailsLoading;
