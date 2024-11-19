import type { ServerDB, ServerFS, ServerPubsub } from '@/types/index.js';

export type Params = {
	databases: ServerDB.Adapter<unknown>[];
	filesystems: ServerFS.Adapter<unknown>[];
	pubsub: ServerPubsub.Adapter;
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
