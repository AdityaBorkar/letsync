import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { default as prisma } from '@prisma/internals';

export async function findPrismaSchemaPath(
	cwd: string,
): Promise<[string, string] | null> {
	const schemaPaths = [
		path.join(cwd, 'prisma/schema.prisma'),
		path.join(cwd, 'schema.prisma'),
	];

	const prismaConfig = await prisma.getPrismaConfigFromPackageJson(cwd);
	if (prismaConfig?.data?.schema) {
		const schemaPath = prismaConfig?.data?.schema;

		const exists = existsSync(schemaPath);
		if (!exists) return null;

		const schemaContent = await readFile(schemaPath, 'utf8');
		return [schemaPath, schemaContent];
	}

	const schemaPath = schemaPaths.find(existsSync) || null;
	if (!schemaPath) return null;

	const schemaContent = await readFile(schemaPath, 'utf8');
	return [schemaPath, schemaContent];
}

export async function writeFileWithDir(filepath: string, content: string) {
	try {
		// Create directory path if it doesn't exist
		const dir = path.dirname(filepath);
		await mkdir(dir, { recursive: true });

		// Write file (creates or overwrites)
		await writeFile(filepath, content);
		console.log('File written successfully');
	} catch (err) {
		console.error('Error:', err);
	}
}
