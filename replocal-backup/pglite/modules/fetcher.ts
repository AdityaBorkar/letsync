export default function fetcher(url: string, method: string, body?: string) {
  return fetch(url, { method, body }).then((res) => res.json())
}
