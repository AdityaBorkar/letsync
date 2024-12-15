export function escapeMd(text: string) {
	return text.replace(/([\\`*_{}[\]()#+\-.!])/g, '\\$1');
}

export function printBashCodeBlock(text: string) {
	return `\`\`\`bash\n${escapeMd(text)}\n\`\`\``;
}
