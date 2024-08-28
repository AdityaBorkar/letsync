interface ReplocalSyncProps {
	auth: any;
	transport: "HTTP" | "MQTT" | "WS";
	localDataConfig: any;
}

export function replocalSync(props: ReplocalSyncProps) {
	const db = [];

	// Reference: https://pglite.dev/extensions/development
	// ---
	// TODO - Import Version-Schema-Migration
	// ---
	// TODO - Local Data Config: Get -> Process -> Pull
	// ---
	const data = pull({});
	const status = db.push(data);

	if (!status) {
		console.error("Error: Failed to push data to database");
	}
}

const localDataConfig = {
	get() {},
	subscribe() {
		// pull(config);
	},
	unsubscribe() {},
	// ---
	process() {
		// TODO - LocalDataConfig to PullConfig
	},
};

// TODO - IMPLEMENT IN `CORE`
type PullConfig = {};
function pull(config: PullConfig) {
	// TODO - PULL: Send Request with Version and Transport
	// ---
	// TODO - MATCH-VERIFY (OPTIONAL)
	// TODO - Schema Validation
	// ---
	// TODO - PUSH to database
	// TODO - UPDATE state and if error, create {error}
	// ...
}
