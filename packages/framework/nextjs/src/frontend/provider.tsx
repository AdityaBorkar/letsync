"use client";

// biome-ignore lint/style/useImportType: BUGGY BIOME
import React, { useEffect, useState, createContext } from "react";
import type {
	Replocal_ClientDb,
	Replocal_PubSub_Frontend,
} from "@replocal/types";

type Connected_Replocal_PubSub = Awaited<
	ReturnType<Replocal_PubSub_Frontend["connect"]>
>;

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
}: {
	workers?: boolean;
	database: Promise<Replocal_ClientDb<DT>>;
	pubsub: Replocal_PubSub_Frontend;
	fallback?: React.ReactNode;
	children: React.ReactNode;
}) {
	const [context, setContext] = useState<{
		database: DT;
		pubsub: Connected_Replocal_PubSub;
	} | null>(null);

	useEffect(() => {
		const replocal = InitializeReplocal({ workers, pubsub, database })
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

// biome-ignore lint/complexity/noUselessTypeConstraint: <explanation>
async function InitializeReplocal<DT extends unknown>({
	workers,
	pubsub: _pubsub,
	database: _database,
}: {
	workers: boolean;
	pubsub: Replocal_PubSub_Frontend;
	database: Promise<Replocal_ClientDb<DT>>;
}) {
	// TODO - RUN BOTH IN SEPARATE SHARED-WORKERS
	if (workers)
		throw new Error("WORKERS ARE CURRENTLY NOT SUPPORTED. WORK IN PROGRESS.");

	if (!_pubsub || _pubsub.__brand !== "REPLOCAL_PUBSUB_FRONTEND")
		throw new Error("INVALID REPLOCAL_PUBSUB");

	const database = await _database;
	if (!database || database.__brand !== "REPLOCAL_CLIENT_DB")
		throw new Error("INVALID REPLOCAL_CLIENT_DB");

	const data = await database.device.register();
	if (!data)
		return {
			database,
			pubsub: pubsubSpoof,
			close: () => {
				database.close();
			},
		};
	const { deviceId, pubsubToken, endpoints } = data;
	const pubsub = await _pubsub.connect({
		clientId: deviceId,
		token: pubsubToken.value,
	});
	await database.push();
	await database.pull();
	await database.live(endpoints);

	return {
		database,
		pubsub,
		close: () => {
			pubsub.disconnect();
			database.close();
		},
	};
}

const pubsubSpoof = {
	async publish() {
		console.error("Client not connected!");
		return;
	},
	async subscribe() {
		console.error("Client not connected!");
		return;
	},
	async disconnect() {
		console.error("Client not connected!");
		return;
	},
} satisfies Connected_Replocal_PubSub;
