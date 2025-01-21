import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { default as prisma } from '@prisma/internals';
import chalk from 'chalk';

export async function findPrismaSchemaPath(
	cwd: string,
): Promise<[string, string] | null> {
	const schemaPaths = [
		join(cwd, 'prisma/schema.prisma'),
		join(cwd, 'schema.prisma'),
	];

	const prismaConfig = await prisma.getPrismaConfigFromPackageJson(cwd);
	if (prismaConfig?.data?.schema) {
		const schemaPath = prismaConfig?.data?.schema;

		const exists = existsSync(schemaPath);
		if (!exists) return null;

		const schemaContent = readFileSync(schemaPath, 'utf8');
		return [schemaPath, schemaContent];
	}

	const schemaPath = schemaPaths.find(existsSync) || null;
	if (!schemaPath) return null;

	const schemaContent = readFileSync(schemaPath, 'utf8');
	return [schemaPath, schemaContent];
}

export function readFiles({
	cwd,
	relativePath: $relativePath,
}: {
	cwd: string;
	relativePath: string;
}): { path: string; content: string }[] {
	const currentPath = join(cwd, $relativePath);
	return readdirSync(currentPath, { withFileTypes: true }).flatMap((entry) => {
		const relativePath = join($relativePath, entry.name);
		if (entry.isDirectory()) return readFiles({ relativePath, cwd });
		const content = readFileSync(join(cwd, relativePath), 'utf8');
		return { path: relativePath, content };
	});
}

export const Console = {
	warn: (...message: string[]) =>
		console.warn(chalk.bgBlue('[LETSYNC]'), ...message),
	info: (...message: string[]) =>
		console.info(chalk.bgBlue('[LETSYNC]'), ...message),
	error: (...message: string[]) =>
		console.error(chalk.bgBlue('[LETSYNC]'), chalk.red(...message)),
	debug: (...message: string[]) =>
		console.debug(chalk.bgBlue('[LETSYNC]'), chalk.gray(...message)),
};
