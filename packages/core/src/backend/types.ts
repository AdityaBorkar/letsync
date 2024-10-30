import type {
	Letsync_PubSub_Backend,
	Letsync_ServerDb,
} from '@/types/index.js';

export type Params = {
	database: Letsync_ServerDb<unknown>;
	pubsub: Letsync_PubSub_Backend;
	request: Request;
	auth: {
		userId: string;
		deviceId: string;
	};
	acl: (args: { userId: string; metadata: string }) =>
		| false
		| {
				roles?: string[];
				granular?: string[];
		  };
};
