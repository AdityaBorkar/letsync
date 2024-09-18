export default async function fetcher(
	url: string,
	method: string,
	body?: string,
) {
	const response = await fetch(url, { method, body })
		.then((res) => res.json())
		.catch((error) => {
			console.error({ error });
			throw error;
		});
	const data = await response.json();
	return data;
}
