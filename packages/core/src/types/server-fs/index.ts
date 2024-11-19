type ServerFS<DT> = {
	__brand: 'LETSYNC_SERVER_FS';
	name: string;
	filesystem: DT;
};

export namespace ServerFS {
	export type Adapter<DT> = ServerFS<DT>;
}
