"use client";

// biome-ignore lint/style/useImportType: BUGGY BIOME
import React, { useEffect, useState, createContext } from "react";
import type {
	Replocal_ClientDb,
	Replocal_PubSub_Frontend,
} from "@replocal/core";
import { frontend } from "@replocal/core";

export type Connected_Letsync_PubSub = Awaited<
	ReturnType<Replocal_PubSub_Frontend["connect"]>
>;

// biome-ignore lint/complexity/noUselessTypeConstraint: <explanation>
interface LetsyncProviderProps<DT extends unknown> {
	workers?: boolean;
	database: Promise<Replocal_ClientDb<DT>>;
	pubsub: Replocal_PubSub_Frontend;
	fallback?: React.ReactNode;
	children: React.ReactNode;
}

export const LetsyncContext = createContext<{
	// TODO - Type Support
	database: unknown;
	pubsub: Connected_Letsync_PubSub;
}>({
	database: null as unknown,
	pubsub: null as unknown as Connected_Letsync_PubSub,
});

// biome-ignore lint/complexity/noUselessTypeConstraint: <explanation>
export function LetsyncProvider<DT extends unknown>({
	workers = false,
	database,
	pubsub,
	fallback,
	children,
}: LetsyncProviderProps<DT>) {
	const [context, setContext] = useState<{
		database: DT;
		pubsub: Connected_Letsync_PubSub;
	} | null>(null);

	useEffect(() => {
		const letsync = frontend
			.initialize({ workers, pubsub, database })
			.then((letsync) => {
				setContext({
					database: letsync.database.database,
					pubsub: letsync.pubsub,
				});
				return letsync;
			})
			.catch((error) => {
				console.error("[Letsync Framework] Initialization Failed: ", error);
			});
		return () => {
			letsync.then((replocal) => replocal?.close());
		};
	}, [workers, pubsub, database]);

	if (context === null) return fallback ?? null;
	return (
		<LetsyncContext.Provider value={context}>
			{children}
		</LetsyncContext.Provider>
	);
}
