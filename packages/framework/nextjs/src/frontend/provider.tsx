"use client";

// biome-ignore lint/style/useImportType: BUGGY BIOME
import React, { useEffect, useState, createContext } from "react";
import type {
	Replocal_ClientDb,
	Replocal_PubSub_Frontend,
} from "@replocal/types";
import initialize from "./initialize.js";

export type Connected_Replocal_PubSub = Awaited<
	ReturnType<Replocal_PubSub_Frontend["connect"]>
>;

// biome-ignore lint/complexity/noUselessTypeConstraint: <explanation>
interface ReplocalProviderProps<DT extends unknown> {
	workers?: boolean;
	database: Promise<Replocal_ClientDb<DT>>;
	pubsub: Replocal_PubSub_Frontend;
	fallback?: React.ReactNode;
	children: React.ReactNode;
}

export const ReplocalContext = createContext<{
	// TODO - Type Support
	database: unknown;
	pubsub: Connected_Replocal_PubSub;
}>({
	database: null as unknown,
	pubsub: null as unknown as Connected_Replocal_PubSub,
});

// biome-ignore lint/complexity/noUselessTypeConstraint: <explanation>
export function ReplocalProvider<DT extends unknown>({
	workers = false,
	database,
	pubsub,
	fallback,
	children,
}: ReplocalProviderProps<DT>) {
	const [context, setContext] = useState<{
		database: DT;
		pubsub: Connected_Replocal_PubSub;
	} | null>(null);

	useEffect(() => {
		const replocal = initialize({ workers, pubsub, database })
			.then((replocal) => {
				setContext({
					database: replocal.database.database,
					pubsub: replocal.pubsub,
				});
				return replocal;
			})
			.catch((error) => {
				console.error("[Framework] Error in initializing Replocal: ", error);
			});
		return () => {
			replocal.then((replocal) => replocal?.close());
		};
	}, [workers, pubsub, database]);

	if (context === null) return fallback ?? null;
	return (
		<ReplocalContext.Provider value={context}>
			{children}
		</ReplocalContext.Provider>
	);
}
