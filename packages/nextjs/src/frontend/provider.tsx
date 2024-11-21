'use client';

import type { ClientDB, ClientFS, ClientPubsub, Config } from '@letsync/core';
import type { LetsyncContextType } from './context.js';

// biome-ignore lint/style/useImportType: BIOME BUG
import React, { useEffect, useState } from 'react';
import { LetsyncContext } from './context.js';
import { createClient } from '@letsync/core';

/**
 * Props for the LetsyncProvider component.
 */
interface LetsyncProviderProps<DB, FS, Pubsub> {
	/**
	 * The client database adapter instance for handling local data storage.
	 */
	db: DB | DB[];

	/**
	 * The client filesystem adapter instance for handling local file storage.
	 */
	fs: FS | FS[];

	/**
	 * The publish/subscribe adapter instance for real-time communication.
	 */
	pubsub: Pubsub;

	/**
	 * The Letsync configuration object.
	 */
	config: Config;

	/**
	 * Whether to use Web Workers for background processing.
	 * @default false
	 */
	workers?: boolean;

	/**
	 * Content to show while the Letsync client is initializing.
	 * @default null
	 */
	fallback?: React.ReactNode;

	/**
	 * The child components that will have access to the Letsync context.
	 */
	children: React.ReactNode;
}

/**
 * Provider component that initializes the Letsync client and makes it available to child components.
 *
 * @example
 * ```tsx
 * <LetsyncProvider
 *   database={myDatabase}
 *   pubsub={myPubSub}
 *   fallback={<LoadingSpinner />}
 * >
 *   <App />
 * </LetsyncProvider>
 * ```
 *
 * @param props - The component props
 * @returns A React component that provides Letsync context to its children
 */
export function LetsyncProvider<
	DB extends ClientDB.Adapter<unknown>,
	FS extends ClientFS.Adapter<unknown>,
	Pubsub extends ClientPubsub.Adapter,
>({
	db: _db,
	fs: _fs,
	config,
	pubsub,
	// workers = false,
	fallback,
	children,
}: LetsyncProviderProps<DB, FS, Pubsub>) {
	const db = Array.isArray(_db) ? _db : [_db];
	const fs = Array.isArray(_fs) ? _fs : [_fs];
	const client = createClient({ db, fs, pubsub, config });

	const [letsync, setLetsync] = useState<LetsyncContextType | null>(null);

	useEffect(() => {
		const letsync = client
			.then(async (client) => {
				const { init, terminate, ...letsync } = client;
				await init();
				setLetsync(letsync);
				return { terminate };
			})
			.catch((error) => {
				console.error('[Letsync Framework] Initialization Failed: ', error);
				return { terminate() {} };
			});

		return () => {
			letsync.then(({ terminate }) => terminate?.());
		};
	}, [client]);

	if (letsync === null) return fallback ?? null;
	return (
		<LetsyncContext.Provider value={letsync}>
			{children}
		</LetsyncContext.Provider>
	);
}
