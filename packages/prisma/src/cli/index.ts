#!/usr/bin/env node

import { program } from 'commander';
import generate from './generate/index.js';

program
	.name('@letsync/prisma-adapter')
	.description('Letsync Prisma CLI')
	.version('1.0.0');

program
	.command('generate')
	.option('-w, --watch', 'Watch for changes and generate schemas')
	.description('Generate Prisma schemas')
	.action(generate);

program.parse(process.argv);
