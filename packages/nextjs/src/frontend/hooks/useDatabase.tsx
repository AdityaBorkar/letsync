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
export function useDatabase() {
	const { database } = useContext(LetsyncContext);
	return database;
}
