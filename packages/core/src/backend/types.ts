import type {
	Replocal_PubSub_Backend,
	Replocal_ServerDb,
} from "@/types/index.js";

export type Params = {
	database: Replocal_ServerDb<unknown>;
	pubsub: Replocal_PubSub_Backend;
	request: Request;
	auth: {
		userId: string;
		deviceId: string;
	};
};
