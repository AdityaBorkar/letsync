import { exec as execAsync } from 'node:child_process';
import { printBashCodeBlock } from './markdown';

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
		console.group(`### ${subject}`);
		console.log(`<b>COMMAND :</b> ${command}`);
		execAsync(command, (error, stdout, stderr) => {
			const isSuccess = !error;

			console.log(`<b>SUCCESS :</b> ${isSuccess}`);
			console.log('<b>STDOUT  :</b>');
			console.log(printBashCodeBlock(stdout));
			console.log('<b>STDERR  :</b>');
			console.log(printBashCodeBlock(stderr));
			console.log('<b>ERROR   :</b>');
			console.log(printBashCodeBlock(error?.message || ''));

			if (isSuccess) {
				resolve({ isSuccess, stdout, stderr, error });
				return;
			}

			process.exitCode = 1;
			reject();
		});
		console.groupEnd();
	});
}
