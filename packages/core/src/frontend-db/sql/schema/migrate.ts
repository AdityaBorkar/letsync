import type { Props } from '../index.js';

interface MigrateSchemaProps {
	version: number;
}

export async function migrate(props: MigrateSchemaProps, superProps: Props) {
	const { metadata } = superProps;

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
