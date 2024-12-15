import { exec as execAsync } from 'node:child_process';

export async function execute({
	subject,
	command,
}: {
	subject: string;
	command: string;
}) {
	return new Promise<{
		isSuccess: boolean;
		stdout: string;
		stderr: string;
		error: Error | null;
	}>((resolve, reject) => {
		console.group(subject);
		console.log(`Command: ${command}`);
		execAsync(command, (error, stdout, stderr) => {
			const isSuccess = !error;

			console.log(`Is Success?: ${isSuccess}`);
			console.log(`stdout: ${stdout}`);
			console.log(`stderr: ${stderr}`);
			console.log(`error: ${error}`);

			if (isSuccess) {
				resolve({ isSuccess, stdout, stderr, error });
				return;
			}

			// JobSummary.write(`<b>Error:</b> ${isSuccess ? '✅' : '❌'} ${command}`);
			// JobSummary.write(
			// 	`\`\`\`bash\n${escapeMd(stdout)}\n\n${escapeMd(stderr)}\n\`\`\``,
			// );

			process.exitCode = 1;
			reject();
		});
		console.groupEnd();
	});
}
