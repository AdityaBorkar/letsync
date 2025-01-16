#!/usr/bin/env node

// import { execSync } from 'node:child_process';
import { program } from 'commander';
import chalk from 'chalk';
import path from 'node:path';
import { readdirSync, readFileSync } from 'node:fs';

program
	.name('@letsync/prisma-adapter')
	.description('Letsync Prisma CLI')
	.version('1.0.0');

// program.action(() => {
// 	console.log(`CWD: ${process.cwd()}`);
// });

program
	.command('generate')
	.description('Generate Prisma schemas')
	.action(() => {
		const cwd = process.cwd();
		console.log(chalk.green(`Generating Prisma schemas from: ${cwd}`));

		const prismaDir = path.join(cwd, 'prisma');
		const schemas = readdirSync(prismaDir)
			.filter((file) => file.endsWith('.prisma'))
			.map((file) => {
				const filePath = path.join(prismaDir, file);
				const fileContent = readFileSync(filePath, 'utf8');
				return { fileContent };
			});

		console.log(schemas);

		// const paths = ['prisma/schema1.prisma', 'prisma/schema2.prisma'];
		// for (const path of paths) {
		// 	execSync(`prisma generate --schema ${path}`, { stdio: 'inherit' });
		// }

		// console.log(output);
		// prisma generate --schema prisma/schema1.prisma
		// prisma generate --schema prisma/schema2.prisma
		// Add initialization logic here
	});

program.parse(process.argv);
