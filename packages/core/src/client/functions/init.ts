import type { ClientParams } from './create.js';

import { Console } from '@/util/Console.js';
// import { live } from '../device/live.js';
// import { pull } from '../device/pull.js';
// import { push } from '../device/push.js';
// import { register } from '../device/register.js';
import { checkForUpdates } from '../schema/checkForUpdates.js';
import { migrate } from '../schema/migrate.js';

type InitProps =
	| undefined
	| {
			// workers?: boolean;
			pushOnInit?: boolean;
			pullOnInit?: boolean;
			liveOnInit?: boolean;
	  };

export async function init(props: InitProps, params: ClientParams) {
	const { debug } = Console({ fn: 'init' });
	debug({ props });

	console.log({ params });

	const updateAvailable = await checkForUpdates({}, params);
	console.log({ updateAvailable });
	if (
		updateAvailable
		// && config.localDb?.updateSchema === 'always'
	)
		await migrate({ version: 'latest' }, params);

	// const device = await register({}, params);
	// debug({ device });

	// if (props.pushOnInit !== false) await push({}, params);
	// if (props.pullOnInit !== false) await pull({}, params);
	// if (props.liveOnInit !== false) {
	// 	await pubsub.connect({
	// 		clientId: device.deviceId || '',
	// 		token: device.pubsub.token || '',
	// 	});
	// 	await live({ endpoints: device.pubsub.endpoints }, params);
	// }
}
