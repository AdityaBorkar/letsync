export type ClientDB_Store_Metadata = {
	remove: (key: string) => Promise<void>;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	upsert: (key: string, content: { [key: string]: any }) => Promise<void>;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	get: (key: string) => Promise<{ [key: string]: any } | null>;
};

export type ClientDB_Store_OfflineChanges = {
	remove: (key: string) => Promise<void>;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	upsert: (key: string, content: { [key: string]: any }) => Promise<void>;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	get: (key: string) => Promise<{ [key: string]: any } | null>;
};
