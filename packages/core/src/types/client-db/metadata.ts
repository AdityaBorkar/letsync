export type ClientDB_MetadataManager = {
	remove: (key: string) => Promise<void>;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	upsert: (key: string, content: { [key: string]: any }) => Promise<void>;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	get: (key: string) => Promise<{ [key: string]: any } | null>;
};
