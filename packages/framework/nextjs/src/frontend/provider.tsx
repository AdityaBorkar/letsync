"use client";

// biome-ignore lint/style/useImportType: BUGGY BIOME
import React, { useEffect, useState, createContext } from "react";
import type { Replocal_ClientDb, Replocal_PubSub } from "@replocal/types";

export const ReplocalContext = createContext<{
	// TODO - Type Support
	database: unknown;
	pubsub: Replocal_PubSub;
}>({
	database: null as unknown,
	pubsub: null as unknown as Replocal_PubSub,
});

// biome-ignore lint/complexity/noUselessTypeConstraint: <explanation>
export function ReplocalProvider<DT extends unknown>({
	initReplocalClient,
	fallback,
	children,
}: {
	initReplocalClient: () => Promise<{
		database: Replocal_ClientDb<DT>;
		pubsub: Replocal_PubSub;
	}>;
	fallback?: React.ReactNode;
	children: React.ReactNode;
}) {
	const [context, setContext] = useState<{
		database: DT;
		pubsub: Replocal_PubSub;
	} | null>(null);

	useEffect(() => {
		const replocal = initReplocalClient()
			.then(async ({ database, pubsub }) => {
				if (!database || database.__brand !== "REPLOCAL_CLIENT_DB")
					throw new Error("INVALID REPLOCAL_CLIENT_DB");
				if (!pubsub || pubsub.__brand !== "REPLOCAL_PUBSUB")
					throw new Error("INVALID REPLOCAL_PUBSUB");

				try {
					await database.device.register();
					await database.push();
					await database.pull();
					await database.live();
				} catch (err) {
					console.error("[Framework] Error in InitReplocalClient: ", err);
				}

				setContext({ database: database.database, pubsub });

				return database;
			})
			.catch((err) => {
				console.error("[Framework] Error in InitReplocalClient: ", err);
			});

		return () => {
			replocal.then((replocal) => replocal?.close());
		};
	}, [initReplocalClient]);

	if (!context) return fallback ?? null;
	return (
		<ReplocalContext.Provider value={{ ...context }}>
			{children}
		</ReplocalContext.Provider>
	);
}
