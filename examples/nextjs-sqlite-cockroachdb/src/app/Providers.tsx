'use client';

import { LetsyncProvider } from '@letsync/nextjs';
import { ClientDB_PGlite } from '@letsync/pglite';
import { PrismaPGlite } from '@letsync/pglite/prisma';
import dynamic from 'next/dynamic';

export default dynamic(() => Promise.resolve(Providers), { ssr: false });

const pglite = ClientDB_PGlite(
	{ name: 'pglite', orm: PrismaPGlite },
	{ dataDir: 'idb://letsync-local' },
);

function Providers({ children }: { children: React.ReactNode }) {
	// TODO - Step 1: Setup the database connection correctly on server-side and client-side
	// TODO - Step 2: Setup the database schemas ONLY

	const pubsub = null;
	// TODO - Step 3: NO-REALTIME SYNC. ONLY REFRESH RECONNECT SYNC.

	return (
		<LetsyncProvider
			db={[pglite]}
			pubsub={pubsub}
			apiUrl="http://localhost:3000/api/letsync"
			// TODO - Link SST Cloudflare Tunnel HERE
		>
			{children}
		</LetsyncProvider>
	);
}
