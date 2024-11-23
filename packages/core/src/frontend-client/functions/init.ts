import type { ClientParams } from './create.js';
import { register } from '../device/register.js';
import { checkForUpdates } from '../schema/checkForUpdates.js';
import { migrate } from '../schema/migrate.js';
import { live } from '../sync/live.js';
import { pull } from '../sync/pull.js';
import { push } from '../sync/push.js';
import { Console } from '@/util/Console.js';

interface InitProps {
	// workers?: boolean;
	pushOnInit?: boolean;
	pullOnInit?: boolean;
	liveOnInit?: boolean;
}

export async function init(props: InitProps, params: ClientParams) {
	const { debug } = Console({ fn: 'init' });
	debug({ props });

	const { pubsub, config } = params;

	const updateAvailable = await checkForUpdates({}, params);
	if (updateAvailable && config.updateSchema === 'always')
		await migrate({ version: 'latest' }, params);

	const device = await register({}, params);
	debug({ device });

	if (props.pushOnInit !== false) await push({}, params);
	if (props.pullOnInit !== false) await pull({}, params);
	if (props.liveOnInit !== false) {
		await pubsub.connect({
			clientId: device.deviceId || '',
			token: device.pubsub.token || '',
		});
		await live({ endpoints: device.pubsub.endpoints }, params);
	}
}
