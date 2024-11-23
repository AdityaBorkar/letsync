export function Console(props: {
	fn: string;
}) {
	const { fn } = props;
	return {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		debug: (...messages: any) => {
			if (process.env.LETSYNC_DEBUG === 'true') console.debug({ fn, messages });
		},
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		error: (...messages: any) => {
			// TODO - Report Errors to server / ...
			console.error({ fn, messages });
		},
	};
}
