'use client';

import { useContext } from 'react';

import { LetsyncContext } from '../context.js';

/**
 * A React hook that provides access to the Letsync context.
 *
 * @returns {Object} An object containing:
 *   - database: The Letsync database instance for data management
 *   - pubsub: The publish/subscribe messaging system for real-time communication
 * 	 - fs: Filesystem
 *
 */
export function useLetsync() {
	const { db, fs, pubsub } = useContext(LetsyncContext);
	return { db, fs, pubsub };
}
