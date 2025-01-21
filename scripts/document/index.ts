import { readdir, readFile, unlink } from 'node:fs/promises';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { cwd } from 'node:process';
import jsdoc from 'jsdoc-to-markdown';

// * Arguments
const args = process.argv.slice(2);
let dir = '';
args.forEach((arg, index) => {
	if (arg === '--dir' && args[index + 1]) dir = args[index + 1] || '';
});
main(dir);

// * Constants
const OUTPUT_BASE_PATH = '/www/cms/reference';

// * Main
async function main(dir: string) {
	// * Package Details
	const pkgFile = await readFile(join(cwd(), dir, 'package.json'), 'utf-8');
	const pkg = JSON.parse(pkgFile);
	const pkgMajorVersion = pkg.version.split('.')[0];
	if (!pkg.name || !pkg.version) {
		console.error('Error: package.json is missing name or version');
		process.exit(1);
	}
	console.log(`Processing "${pkg.name}"@"${pkg.version}"`);

	// * Output Path
	const OUTPUT_PATH = join(
		cwd(),
		OUTPUT_BASE_PATH,
		pkg.name.replace('@letsync/', ''),
		pkgMajorVersion,
		'api',
	);
	if (existsSync(OUTPUT_PATH)) {
		const files = await readdir(OUTPUT_PATH);
		for (const file of files) {
			await unlink(join(OUTPUT_PATH, file));
		}
	} else {
		mkdirSync(OUTPUT_PATH, { recursive: true });
	}

	// * Generate Docs
	const files = await jsdoc.getTemplateData({
		files: join(cwd(), dir, 'dist/**/*.js'),
	});
	for (const file of files) {
		if (!('id' in file)) continue;
		const doc = await jsdoc.render({
			data: [file],
		});
		const md = `---\nindex: 0\ntitle: ${file.id}\ndescription: NONE\n---\n${doc}`;
		writeFileSync(join(OUTPUT_PATH, `${file.id}.md`), md, 'utf-8');
	}

	// * Copy Changelog
	const META_PATH = join(
		cwd(),
		OUTPUT_BASE_PATH,
		pkg.name.replace('@letsync/', ''),
		pkgMajorVersion,
		'meta',
	);
	if (!existsSync(META_PATH)) mkdirSync(META_PATH, { recursive: true });
	const changelog = await readFile(join(cwd(), dir, 'CHANGELOG.md'), 'utf-8');
	const changelog_md = `---\nindex: 0\ntitle: Release Notes\ndescription: NONE\n---\n${changelog}`;
	writeFileSync(join(META_PATH, 'release-notes.md'), changelog_md, 'utf-8');
}
