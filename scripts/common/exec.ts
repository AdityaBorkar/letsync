import { exec as execAsync } from 'node:child_process';

export async function exec(command: string) {
	return new Promise<{
		command: string;
		isSuccess: boolean;
		stdout: string;
		stderr: string;
		error: Error | null;
	}>((resolve) => {
		execAsync(command, (error, stdout, stderr) => {
			resolve({ command, isSuccess: !error, error, stdout, stderr });
		});
	});
}
