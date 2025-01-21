import type { Client } from 'pg';

export type OrmFunction = (client: Client) => {
	client: Client;
	schema: null;
};
