'use client';

import { useContext } from 'react';

import { LetsyncContext } from '../context.js';

/**
 * A React hook that provides access to the Letsync network state.
 *
 * @returns {Object} An object containing:
 *   - database: The Letsync database instance
 *   - pubsub: The publish/subscribe messaging system instance
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { database, pubsub } = useNetworkState();
 *
 *   // Use database or pubsub
 *   return <div>...</div>;
 * }
 * ```
 */
export function useNetworkState() {
	const { database, pubsub } = useContext(LetsyncContext);
	return { database, pubsub };
}
