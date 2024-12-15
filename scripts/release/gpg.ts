import { execute } from '../common/execute';

function parseKeygripFromGpgColonsOutput(
	output: string,
	fingerprint: string,
): string {
	let keygrip = '';
	let fingerPrintFound = false;
	const lines = output.replace(/\r/g, '').trim().split(/\n/g);

	for (const line of lines) {
		if (line.startsWith('fpr:') && line.includes(`:${fingerprint}:`)) {
			// We reach the record with the matching fingerprint.
			// The next keygrip record is the keygrip for this fingerprint.
			fingerPrintFound = true;
			continue;
		}

		if (line.startsWith('grp:') && fingerPrintFound) {
			keygrip = line.replace(/(grp|:)/g, '').trim();
			break;
		}
	}

	return keygrip;
}

export async function PRESET_PASSPHRASE(params: {
	keyId: string;
	passphrase: string;
}) {
	const ListKeys = await execute({
		subject: 'List Keys',
		command: `gpg --batch --with-colons --with-keygrip --list-secret-keys ${params.keyId}`,
	});
	const KEYGRIP = parseKeygripFromGpgColonsOutput(
		ListKeys.stdout,
		params.keyId,
	);
	const HEX_PASSPHRASE: string = Buffer.from(params.passphrase, 'utf8')
		.toString('hex')
		.toUpperCase();
	await execute({
		subject: 'Preset Passphrase',
		command: `gpg-connect-agent 'PRESET_PASSPHRASE ${KEYGRIP} -1 ${HEX_PASSPHRASE}' /bye`,
	});
	await execute({
		subject: 'Print Key Info',
		command: `gpg-connect-agent 'KEYINFO ${KEYGRIP}' /bye`,
	});
}
