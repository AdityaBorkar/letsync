import 'server-only';

// import { Resource } from 'sst';
// import { PubSub_Backend } from '@letsync/aws-iot';
import { ServerDB_CockroachDB } from '@letsync/cockroachdb';
import { PrismaCockroachDB } from '@letsync/cockroachdb/prisma';

// @ts-ignore
export const pubsub = null as any;
// PubSub_Backend({
// 	prefix: `${Resource.App.name}-${Resource.App.stage}`,
// 	tokenSecret: process.env.PUBSUB_TOKEN_SECRET || '',
// });
// const PubSubAuthFn = pubsub.AuthFn;

export const database = ServerDB_CockroachDB(
	{
		name: 'cockroachdb',
		orm: PrismaCockroachDB,
		// pubsub
	},
	{
		// postgresql://<username>:<password>@<host>:<port>/<database>?sslmode=verify-full
	},
)({
	pubsub,
	config: {
		apiUrl: 'http://localhost:3000/api/letsync',
	},
});
