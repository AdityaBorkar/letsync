import { Console } from '@/util/Console.js';
import type { ClientParams } from '../functions/create.js';

interface MigrateSchemaProps {
	version: number | 'latest';
}

export async function migrate(props: MigrateSchemaProps, params: ClientParams) {
	props;
	const { debug } = Console({ fn: 'migrate' });

	const { metadata } = params.stores;

	const schema = await metadata.get('schema');
	if (!schema) throw new Error('SCHEMA NOT FOUND');
	debug({ schema });

	if (props.version === schema.version) {
		throw new Error('SCHEMA IS ALREADY AT LATEST VERSION');
	}
	if (props.version < schema.version) {
		throw new Error('SCHEMA DOWNGRADE IS CURRENTLY NOT SUPPORTED');
	}

	// TODO - MIGRATE SCHEMA
}
