export default async function fetcher(
	url: string,
	method: string,
	body?: string,
) {
	// TODO - TYPE COMPLETION for `url` and `method` and `response`
	const response = await fetch(url, { method, body })
		.then((res) => res.json())
		.catch((error) => {
			console.error({ error });
			throw error;
		});
	return await response;
}
