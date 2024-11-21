import type { ClientParams } from '../create.js';

interface MigrateSchemaProps {
	version: number | 'latest';
}

export async function migrate(props: MigrateSchemaProps, params: ClientParams) {
	const { metadata } = params;

	const schema = await metadata.get('schema');

	console.log({ props, schema });
	// if (props.version === schema.version) {
	// 	throw new Error('SCHEMA IS ALREADY AT LATEST VERSION');
	// }
	// if (props.version < schema.version) {
	// 	throw new Error('SCHEMA DOWNGRADE IS CURRENTLY NOT SUPPORTED');
	// }

	// ...
}
