import type {
	Letsync_PubSub_Backend,
	Letsync_ServerDB,
	Letsync_ServerFS,
} from '@/types/index.js';

export type Params = {
	databases: Letsync_ServerDB<unknown>[];
	filesystems: Letsync_ServerFS<unknown>[];
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
