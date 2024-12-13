'use client';

import { useEffect, useState } from 'react';

export enum NetworkStatus {
	Online = 1,
	Offline = 0,
}

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
	const [networkState, setNetworkState] = useState<NetworkStatus>(
		'online' in navigator
			? navigator.onLine
				? NetworkStatus.Online
				: NetworkStatus.Offline
			: NetworkStatus.Online,
	);

	useEffect(() => {
		setNetworkState(
			navigator.onLine ? NetworkStatus.Online : NetworkStatus.Offline,
		);

		const handleOnline = () => {
			setNetworkState(NetworkStatus.Online);
		};
		const handleOffline = () => {
			setNetworkState(NetworkStatus.Offline);
		};
		window.addEventListener('online', handleOnline);
		window.addEventListener('offline', handleOffline);

		return () => {
			window.removeEventListener('online', handleOnline);
			window.removeEventListener('offline', handleOffline);
		};
	}, []);

	return networkState;
}
