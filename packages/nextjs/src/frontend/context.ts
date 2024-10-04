import { createContext } from "react";
import type {
	ClientDbAdapter,
	Letsync_PubSub_Frontend as PubsubAdapter,
} from "@letsync/core";

export type Connected_PubsubAdapter = Awaited<
	ReturnType<PubsubAdapter["connect"]>
>;

export interface LetsyncContextType {
	database: ClientDbAdapter;
	pubsub: Connected_PubsubAdapter;
}

export const LetsyncContext = createContext<LetsyncContextType>({
	database: null as unknown as ClientDbAdapter,
	pubsub: null as unknown as Connected_PubsubAdapter,
});
