import { exec as execAsync } from 'node:child_process';
import { printError } from './printError';

export async function exec(command: string) {
	return new Promise<{
		command: string;
		isSuccess: boolean;
		stdout: string;
		stderr: string;
		error: Error | null;
	}>((resolve, reject) => {
		execAsync(command, (error, stdout, stderr) => {
			const isSuccess = !error;
			if (!isSuccess) {
				printError({ command, isSuccess, stdout, stderr });
				process.exitCode = 1;
				reject();
			} else {
				resolve({ command, isSuccess, stdout, stderr, error });
			}
		});
	});
}
