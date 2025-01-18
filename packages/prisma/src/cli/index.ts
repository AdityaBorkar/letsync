#!/usr/bin/env node

import { program } from 'commander';
import generate from './generate/index.js';

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
	.action(generate);

program.parse(process.argv);
