type ClientFS<DT> = {
	__brand: 'LETSYNC_CLIENT_FILESYSTEM';
	name: string;
	filesystem: DT;
	init: () => Promise<void>;
};

export namespace ClientFS {
	export type Adapter<DT> = ClientFS<DT>;
}
