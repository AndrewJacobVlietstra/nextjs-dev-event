import Skeleton from "@/components/Skeleton";

const HomeLoading = () => {
	return (
		<div className="">
			<div className="flex justify-center">
				<Skeleton className="w-158 h-62" />
			</div>

			<div className="mt-20 space-y-7">
				<Skeleton className="w-full" />
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
					<Skeleton className="w-full h-100" />
					<Skeleton className="w-full h-100" />
					<Skeleton className="w-full h-100" />
				</div>
			</div>
		</div>
	);
};
export default HomeLoading;
