import type { Config } from '@/types/config.js';

export function LetsyncConfig(config: Omit<Config, '__brand'>): Config {
	const apiBaseUrl =
		config.apiBaseUrl ?? process.env.LETSYNC_API_BASE_URL ?? '/api/letsync';

	// TODO: localDb

	// TODO: schema

	return { ...config, apiBaseUrl, __brand: 'LETSYNC_CONFIG' };
}
