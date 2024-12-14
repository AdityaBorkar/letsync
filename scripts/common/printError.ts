import { escapeMd } from './escapeMd';

export function printError(props: {
	isSuccess: boolean;
	command: string;
	stdout: string;
	stderr: string;
}) {
	console.log(
		`<b>Error:</b> ${props.isSuccess ? '✅' : '❌'} ${props.command}`,
	);
	console.log(
		`\`\`\`bash\n${escapeMd(props.stdout)}\n\n${escapeMd(props.stderr)}\n\`\`\``,
	);
}
