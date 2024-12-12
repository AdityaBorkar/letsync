export function escapeMd(text: string) {
	return text.replace(/([\\`*_{}[\]()#+\-.!])/g, '\\$1');
}
