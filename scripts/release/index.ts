import fs from 'node:fs';
import { execute } from '../common/execute';

release();

/**
 * Example:
 * bun ./scripts/release.ts tag=trigger.release type=canary
 * bun ./scripts/release.ts tag=trigger.release type=${{ github.event.release.target_commitish }}
 */
async function release() {
	// // Debug Mode
	// const DEBUG_MODE =
	// 	process.env.GITHUB_ACTION_DEBUG === 'true' ||
	// 	process.env.GITHUB_ACTION_DEBUG === '1';

	// Input Arguments
	const args = process.argv.reduce(
		(acc, string) => {
			const [key, value] = string.split('=');
			if (!key) return acc;
			acc[key] = value || '';
			return acc;
		},
		{
			// Default Values
			type: 'stable',
			tag: 'trigger.release',
		} as Record<string, string>,
	);

	// Input Parameters
	const PARAMS = {
		GIT: {
			USER_NAME: 'GitHub Actions Bot',
			USER_EMAIL: 'aditya.borkar.programs+github.actions@gmail.com',
		},
		GPG: {
			KEY_ID: process.env.GPG_KEY_ID || '',
			PASSPHRASE: process.env.GPG_PASSPHRASE || '',
			PRIVATE_KEY: process.env.GPG_PRIVATE_KEY || '',
		},
		NPM: {
			ACCESS_TOKEN: process.env.NPM_ACCESS_TOKEN || '',
		},
		RELEASE: {
			TAG: args.tag,
			TYPE: args.type,
		},
		FILEPATHS: {
			SECRET_KEY: './GPG_SECRET_KEY.asc',
			SECRET_TEXT: './GPG_SECRET_TEXT.txt',
		},
	};

	// Job Summary
	console.log('## Release');

	// Script Execution
	await execute({
		subject: 'Delete Trigger Release Tag',
		command: `gh release delete ${PARAMS.RELEASE.TAG} --yes --cleanup-tag`,
	});
	await execute({
		subject: 'Set TTY for GPG',
		command: "echo -e '\n\nexport GPG_TTY=$(tty)\n' >> ~/.bashrc",
	});
	fs.writeFileSync(PARAMS.FILEPATHS.SECRET_KEY, PARAMS.GPG.PRIVATE_KEY);
	await execute({
		subject: 'Import GPG Secret Key',
		command: `gpg --batch --yes --import ${PARAMS.FILEPATHS.SECRET_KEY}`,
	});
	fs.unlinkSync(PARAMS.FILEPATHS.SECRET_KEY);
	fs.writeFileSync(PARAMS.FILEPATHS.SECRET_TEXT, PARAMS.GPG.PASSPHRASE);
	await execute({
		subject: 'Sign Test Message',
		command: `echo "TEST MESSAGE" | gpg --batch --yes --pinentry-mode=loopback --local-user="${PARAMS.GPG.KEY_ID}" --passphrase-file=${PARAMS.FILEPATHS.SECRET_TEXT} --clear-sign`,
	});
	fs.unlinkSync(PARAMS.FILEPATHS.SECRET_TEXT);
	// ---
	// await execute({
	// 	subject: 'GPG Agent Configuration',
	// 	command:
	// 		"echo -e '\ndefault-cache-ttl 21600\nmax-cache-ttl 31536000\nallow-preset-passphrase\n' >> ~/.gnupg/gpg-agent.conf",
	// });
	// await execute({
	// 	subject: 'Reload GPG Agent',
	// 	command: "gpg-connect-agent 'RELOADAGENT' /bye",
	// });
	// await PRESET_PASSPHRASE({
	// 	keyId: PARAMS.GPG.KEY_ID,
	// 	passphrase: PARAMS.GPG.PASSPHRASE,
	// });
	// ---
	await execute({
		subject: 'Set NPM Access Token',
		command: `npm config set '//registry.npmjs.org/:_authToken' ${PARAMS.NPM.ACCESS_TOKEN}`,
	});
	await execute({
		subject: 'Enable Git Tag Signing',
		command: 'git config --global tag.gpgSign true',
	});
	await execute({
		subject: 'Disable Git Push Signing',
		command: 'git config --global push.gpgSign false',
	});
	await execute({
		subject: 'Enable Git Commit Signing',
		command: 'git config --global commit.gpgSign true',
	});
	await execute({
		subject: 'Set Git User Name',
		command: `git config --global user.name "${PARAMS.GIT.USER_NAME}"`,
	});
	await execute({
		subject: 'Set Git User Email',
		command: `git config --global user.email "${PARAMS.GIT.USER_EMAIL}"`,
	});
	await execute({
		subject: 'Set Git User Signing Key',
		command: `git config --global user.signingkey ${PARAMS.GPG.KEY_ID}`,
	});
	await execute({
		subject: 'Release Packages',
		command: `bun nx release --projects=packages/* ${PARAMS.RELEASE.TYPE === 'canary' ? '--preid=canary' : ''}`,
	});
	await execute({
		subject: 'Publish Packages',
		command: 'bun nx release publish --projects=packages/*',
	});
	// const ReleaseOutput = await nxRelease({
	// 	projects: ['packages/core'],
	// 	skipPublish: true,
	// });
	// console.log('### Release Output:');
	// console.log(ReleaseOutput.toString());
	// const PublishOutput = await releasePublish({ projects: ['packages/core'] });
	// console.log('### Publish Output:');
	// console.log(PublishOutput.toString());

	// Job Summary
	console.log('Status: Success');
	process.exitCode = 0;
	return;
}
