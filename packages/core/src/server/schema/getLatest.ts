export default async function schemaGetLatest() {
	// TODO - CACHE THIS IN THE CDN
	console.log('GETTING LATEST SCHEMA');
	return { version: 1 };
}
