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

	// Delete Trigger Release Tag
	await exec(
		`gh release delete ${TRIGGER_RELEASE_TAG_NAME} --yes --cleanup-tag`,
	);

	// GPG Keys
	await exec('sudo apt-get install gnupg');
	await exec(
		`echo "${process.env.GPG_PRIVATE_KEY}" | gpg --pinentry-mode loopback --batch --import`,
	);
	await exec(
		`echo "test message" | gpg --pinentry-mode loopback --batch --yes --local-user "${process.env.GPG_SIGNING_KEY}" --passphrase "${process.env.GPG_PASSPHRASE}" --clear-sign`,
	);

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

	// Release
	await exec(
		`bun nx release --projects=packages/* ${TARGET_RELEASE_TYPE === 'canary' ? '--preid=canary' : ''}`,
	);

	// // Deploy
	// await exec('bun run deploy');
}
