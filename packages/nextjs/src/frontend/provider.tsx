"use client";

// biome-ignore lint/style/useImportType: BUGGY BIOME
import React, { useEffect, useState, createContext } from "react";

import type { Replocal_ClientDb } from "@replocal/core";

export const ReplocalContext = createContext<{ db: Replocal_ClientDb | null }>({
	db: null,
});

export function ReplocalProvider({
	clientDb,
	children,
}: {
	clientDb: Replocal_ClientDb;
	children: React.ReactNode;
}) {
	const [isLoading, setIsLoading] = useState(true);

	if (!clientDb || clientDb.__brand !== "REPLOCAL_CLIENT_DB")
		throw new Error("Invalid REPLOCAL_CLIENT_DB");

	useEffect(() => {
		initializeClientDb(clientDb).then(() => setIsLoading(false));
	}, [clientDb]);

	if (isLoading) return null;
	return (
		<ReplocalContext.Provider value={{ db: clientDb.database }}>
			{children}
		</ReplocalContext.Provider>
	);
}

function initializeClientDb(clientDb: Replocal_ClientDb) {
	return new Promise((resolve, reject) => {
		clientDb.waitUntilReady().then(async () => {
			// TODO - Authentication & Authorization

			// TODO - Allow in some cases to delay registration
			await clientDb.device.register();

			// TODO - Allow in some cases to delay syncing
			await clientDb.push();
			await clientDb.pull();
			await clientDb.live();
			resolve(true);
		});
	});
}
