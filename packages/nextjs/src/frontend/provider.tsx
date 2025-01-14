'use client';

import type { ClientDB, ClientFS, ClientPubsub, Config } from '@letsync/core';
import { createClient } from '@letsync/core';
// biome-ignore lint/style/useImportType: BIOME BUG
import React, { useEffect, useMemo, useState } from 'react';

import { LetsyncContext, type LetsyncContextType } from './context.js';

/**
 * Props for the LetsyncProvider component.
 */
interface LetsyncProviderProps<DB, FS, Pubsub> {
	/**
	 * The client database adapter instance for handling local data storage.
	 */
	db?: DB | DB[];

	/**
	 * The client filesystem adapter instance for handling local file storage.
	 */
	fs?: FS | FS[];

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
	DB extends ClientDB.CreateAdapter<unknown>,
	FS extends ClientFS.Adapter<unknown>,
	Pubsub extends ClientPubsub.Adapter,
>({
	db: _db,
	fs: _fs,
	config,
	pubsub,
	fallback,
	children,
}: LetsyncProviderProps<DB, FS, Pubsub>) {
	const client = useMemo(() => {
		if (pubsub.__brand !== 'LETSYNC_PUBSUB_FRONTEND')
			throw new Error(
				`Invalid PubSub Adapter. Expected: LETSYNC_PUBSUB_FRONTEND, Found: ${pubsub.__brand}`,
			);

		if (config.__brand !== 'LETSYNC_CONFIG')
			throw new Error(
				`Invalid Config. Expected: LETSYNC_CONFIG, Found: ${config.__brand}`,
			);

		const { schema } = config;

		const dbList = _db ? (Array.isArray(_db) ? _db : [_db]) : [];
		const db = dbList.map((db) => {
			const database = db({ pubsub, schema });
			if (database.__brand !== 'LETSYNC_CLIENT_DATABASE')
				throw new Error(
					`Invalid Database Adapter. Expected: LETSYNC_CLIENT_DATABASE, Found: ${database.__brand}`,
				);
			return database;
		});

		const fsList = _fs ? (Array.isArray(_fs) ? _fs : [_fs]) : [];
		const fs = fsList.map((fs) => {
			if (fs.__brand !== 'LETSYNC_CLIENT_FILESYSTEM')
				throw new Error(
					`Invalid Filesystem Adapter. Expected: LETSYNC_CLIENT_FILESYSTEM, Found: ${fs.__brand}`,
				);
			return fs;
		});

		const client = createClient({ db, fs, pubsub, config });
		return client;
	}, [pubsub, config, _db, _fs]);

	const [letsync, setLetsync] = useState<LetsyncContextType | null>(null);

	useEffect(() => {
		const letsync = client
			.then(async (client) => {
				const { init, terminate, ...letsync } = client;
				await init({});
				setLetsync(letsync);
				return { terminate };
			})
			.catch((error) => {
				console.error('[Letsync Framework] Initialization Failed: ', error);
				return { terminate() {} };
			});

		return () => {
			letsync.then(({ terminate }) => terminate?.({}));
		};
	}, [client]);

	if (letsync === null) return fallback ?? null;
	return (
		<LetsyncContext.Provider value={letsync}>
			{children}
		</LetsyncContext.Provider>
	);
}
