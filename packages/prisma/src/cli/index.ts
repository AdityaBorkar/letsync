#!/usr/bin/env node

import { program } from 'commander';

program
	.version('1.0.0')
	.description('Letsync Prisma CLI')
	.option('-v, --version', 'Show version')
	.option('-g, --generate', 'Generate Prisma schemas')
	.action((options) => {
		console.log(`Hey, ${options.name}!`);
		// prisma generate --schema prisma/schema1.prisma
		// prisma generate --schema prisma/schema2.prisma
	});

program.parse(process.argv);
