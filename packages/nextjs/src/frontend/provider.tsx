"use client";

import type {
	ClientDbAdapter,
	Letsync_PubSub_Frontend as PubsubAdapter,
} from "@letsync/core";
import type { LetsyncContextType } from "./context.js";

// biome-ignore lint/style/useImportType: BIOME BUG
import React, { useEffect, useState } from "react";
import { LetsyncContext } from "./context.js";
import { frontend } from "@letsync/core";

interface LetsyncProviderProps {
	workers?: boolean;
	database: Promise<ClientDbAdapter>;
	pubsub: PubsubAdapter;
	fallback?: React.ReactNode;
	children: React.ReactNode;
}

export function LetsyncProvider({
	workers = false,
	database,
	pubsub,
	fallback,
	children,
}: LetsyncProviderProps) {
	const [context, setContext] = useState<LetsyncContextType | null>(null);

	useEffect(() => {
		const letsync = frontend.client
			.initialize({ workers, pubsub, database })
			.then((letsync) => {
				setContext({
					database: letsync.database,
					pubsub: letsync.pubsub,
				});
				return letsync;
			})
			.catch((error) => {
				console.error("[Letsync Framework] Initialization Failed: ", error);
			});

		return () => {
			letsync.then((letsync) => letsync?.close());
		};
	}, [workers, pubsub, database]);

	if (context === null) return fallback ?? null;
	return (
		<LetsyncContext.Provider value={context}>
			{children}
		</LetsyncContext.Provider>
	);
}
