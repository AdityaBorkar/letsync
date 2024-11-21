type ClientFS<DT> = {
	__brand: 'LETSYNC_CLIENT_FILESYSTEM';
	name: string;
	filesystem: DT;
	initialize: () => Promise<void>;
};

export namespace ClientFS {
	export type Adapter<DT> = ClientFS<DT>;
}
