import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

type SkeletonProps = {
	className?: ClassValue;
};

const Skeleton = ({ className }: SkeletonProps) => {
	return (
		<div
			className={cn(
				"animate-pulse w-20 h-10 bg-accent-foreground/90 rounded-lg",
				className
			)}
		/>
	);
};
export default Skeleton;
