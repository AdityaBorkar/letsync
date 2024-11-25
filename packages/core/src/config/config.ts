import type { Config } from '@/types/config.js';

export function LetsyncConfig(config: Exclude<Config, '__brand'>): Config {
	const { apiBaseUrl: _apiBaseUrl, localDb, schema } = config;

	const apiBaseUrl =
		_apiBaseUrl ?? process.env.LETSYNC_API_BASE_URL ?? '/api/letsync';

	return { __brand: 'LETSYNC_CONFIG', apiBaseUrl, schema, localDb };
}
