'use client';

import { useContext } from 'react';

import { LetsyncContext } from '../context.js';

/**
 * A React hook that provides access to the Letsync database instance.
 *
 * @returns {Object} An object containing the Letsync database instance
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const database = useDatabase();
 *
 *   // Use database
 *   return <div>...</div>;
 * }
 * ```
 */
export function useDatabase(name?: string) {
	const { db } = useContext(LetsyncContext);

	if (!name && db.length !== 1)
		throw new Error(
			'Kindly specify a database name or ensure there is only one database configured.',
		);

	const database = name ? db.find((db) => db.name === name) : db[0];
	if (!database) throw new Error(`No database with name "${name}" found.`);

	return database;
}
