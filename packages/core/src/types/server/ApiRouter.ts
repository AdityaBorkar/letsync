export type ApiRouter = {
	POST: {
		'/device': {
			searchParams: undefined;
			response: {
				device: {
					userId: string;
					deviceId: string;
					isActive: boolean;
				};
				schema: {
					version: number;
				};
				pubsub: {
					token: string;
					endpoints: string[];
				};
			};
		};
	};
	GET: {
		'/device': {
			searchParams: { deviceId: string };
			response: {
				device: {
					userId: string;
					deviceId: string;
					isActive: boolean;
				};
				schema: {
					version: string;
				};
				pubsub: {
					token: string;
					endpoints: string[];
				};
			};
		};
		'/schema/versions': {
			searchParams: undefined;
			response: {
				versions: number[];
			};
		};
	};
	DELETE: {
		'/device': {
			searchParams: { deviceId: string };
			response: {
				success: boolean;
			};
		};
	};
};
