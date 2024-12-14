import { escapeMd } from './common/escapeMd';
import { exec } from './common/exec';

release();

/**
 * Example:
 * bun ./scripts/release.ts tag=trigger.release type=canary
 * bun ./scripts/release.ts tag=trigger.release type=${{ github.event.release.target_commitish }}
 */
async function release() {
	// Input Arguments
	const args = process.argv.reduce(
		(acc, string) => {
			const [key, value] = string.split('=');
			if (!key) return acc;
			acc[key] = value || '';
			return acc;
		},
		{
			type: 'stable',
			tag: 'trigger.release',
		} as Record<string, string>,
	);
	const TARGET_RELEASE_TYPE = args.type;
	const TRIGGER_RELEASE_TAG_NAME = args.tag;

	// Job Summary
	console.log('## Release');

	console.log('\nGPG_PRIVATE_KEY = ', process.env.GPG_PRIVATE_KEY?.length);
	console.log('\nGPG_PASSPHRASE = ', process.env.GPG_PASSPHRASE?.length);
	console.log('\nGPG_SIGNING_KEY = ', process.env.GPG_SIGNING_KEY?.length);

	// GPG Keys
	await exec(
		`echo "${process.env.GPG_PRIVATE_KEY}" | gpg --pinentry-mode loopback --batch --import`,
	);
	const testSignResult = await exec(
		`echo "test message" | gpg --pinentry-mode loopback --batch --yes --passphrase ${process.env.GPG_PASSPHRASE} --sign`,
	);
	console.log(
		`<b>Status:</b> ${testSignResult.isSuccess ? '✅' : '❌'} Test GPG Sign <br/> Executed command: <code>${testSignResult.command}</code>\n`,
	);
	console.log(
		`\`\`\`bash\n${escapeMd(testSignResult.stdout)}\n\n${escapeMd(testSignResult.stderr)}\n\`\`\``,
	);
	if (!testSignResult.isSuccess) return process.exit(1);

	// Git Config
	await exec(`git config --global user.name "GitHub Actions Bot"`);
	await exec(
		`git config --global user.email "aditya.borkar.programs+github.actions@gmail.com"`,
	);
	await exec(
		`git config --global user.signingkey ${process.env.GPG_SIGNING_KEY}`,
	);
	await exec('git config --global commit.gpgSign true');
	await exec('git config --global push.gpgSign false');
	await exec('git config --global tag.gpgSign true');

	// NPM Config
	await exec(
		`npm config set '//registry.npmjs.org/:_authToken' ${process.env.NPM_ACCESS_TOKEN}`,
	);
	// await exec(
	// 	`npm config set '//npm.pkg.github.com/:_authToken' ${process.env.GITHUB_TOKEN}`,
	// );

	// Delete Trigger Release Tag
	const deleteTag = await exec(
		`gh release delete ${TRIGGER_RELEASE_TAG_NAME} --yes --cleanup-tag`,
	);
	console.log(
		`<b>Status:</b> ${deleteTag.isSuccess ? '✅' : '❌'} Delete Trigger Release Tag <br/> Executed command: <code>${deleteTag.command}</code>\n`,
	);
	console.log(
		`\`\`\`bash\n${escapeMd(deleteTag.stdout)}\n\n${escapeMd(deleteTag.stderr)}\n\`\`\``,
	);
	if (!deleteTag.isSuccess) return process.exit(1);

	// Release
	const release = await exec(
		`bun nx release --projects=packages/* ${TARGET_RELEASE_TYPE === 'canary' ? '--preid=canary' : ''}`,
	);
	const releaseTitle = release.isSuccess
		? 'Release Executed'
		: 'Release Failed';
	console.log(
		`<b>Status:</b> ${release.isSuccess ? '✅' : '❌'} ${releaseTitle} <br/> Executed command: <code>${release.command}</code>\n`,
	);
	console.log(
		`\`\`\`bash\n${escapeMd(release.stdout)}\n\n${escapeMd(release.stderr)}\n\`\`\``,
	);
	if (!release.isSuccess) return process.exit(1);

	// // Deploy
	// const deploy = await exec('bun run deploy');

	// // Job Summary
	// console.log('## Deploy');
	// console.log(
	// 	`<b>Status:</b> ${release.isSuccess ? '✅' : '❌'} ${releaseTitle} <br/> Executed command: <code>${release.command}</code>\n`,
	// );
	// console.log(
	// 	`\`\`\`bash\n${escapeMd(release.stdout)}\n\n${escapeMd(release.stderr)}\n\`\`\``,
	// );
}
