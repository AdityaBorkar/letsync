import { createContext } from 'react';
import type {
	ClientDbAdapter,
	ClientDbAdapter as ClientFilesystemAdapter,
	Letsync_PubSub_Frontend as PubsubAdapter,
} from '@letsync/core';

export type Connected_PubsubAdapter = Awaited<
	ReturnType<PubsubAdapter['connect']>
>;

export interface LetsyncContextType {
	db: ClientDbAdapter[];
	fs: ClientFilesystemAdapter[];
	pubsub: Connected_PubsubAdapter;
}

export const LetsyncContext = createContext<LetsyncContextType>({
	db: [] as ClientDbAdapter[],
	fs: [] as ClientFilesystemAdapter[],
	pubsub: null as unknown as Connected_PubsubAdapter,
});
