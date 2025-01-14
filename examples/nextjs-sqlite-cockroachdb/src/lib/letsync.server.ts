import "server-only"

// import { Resource } from 'sst';
// import { PubSub_Backend } from '@letsync/aws-iot';
import { LetsyncHandlers } from "@letsync/nextjs";
import { ServerDb_CockroachDB } from '@letsync/cockroachdb';
import { PrismaCockroachDB } from '@letsync/cockroachdb/prisma';

const pubsub = null as any;
// PubSub_Backend({
// 	prefix: `${Resource.App.name}-${Resource.App.stage}`,
// 	tokenSecret: process.env.PUBSUB_TOKEN_SECRET || '',
// });
// const PubSubAuthFn = pubsub.AuthFn;

export const database = ServerDb_CockroachDB(
	{ 
		name: 'cockroachdb', 
		orm: PrismaCockroachDB ,
		pubsub
	},
	{ 
		userName: 'vasundhara-aakash',
		password: 'vasundhara-aakash',
		host: 'localhost',
		port: 26257,
		database: 'letsync',
	 }
);

export default LetsyncHandlers({
	db: [database],
	fs: [],
	pubsub,
	auth (request: Request) {
		return {
			deviceId: 'vasundhara-aakash',
			userId: 'vasundhara-aakash',
			message: 'Hello World',
			statusCode: 200,
		};
	},
});
