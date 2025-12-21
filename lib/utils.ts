import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const sleep = async (seconds = 1) => {
	const ms = seconds * 1000; // convert seconds to ms
	await new Promise((resolve) => setTimeout(resolve, ms));
};
