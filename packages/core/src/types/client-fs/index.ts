type ClientFS<DT> = {
	__brand: 'LETSYNC_CLIENT_FS';
	name: string;
	filesystem: DT;
};

export namespace ClientFS {
	export type Adapter<DT> = ClientFS<DT>;
}
