import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function Object_groupBy<T, K extends keyof T>(
	items: T[],
	key: K,
): Record<string, T[]> {
	return items.reduce(
		(result, item) => {
			const group = String(item[key]);
			if (!result[group]) {
				result[group] = [];
			}
			result[group].push(item);
			return result;
		},
		{} as Record<string, T[]>,
	);
}
