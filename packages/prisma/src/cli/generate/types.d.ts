type LetsyncConfig = {
	name: string;
	type: 'server' | 'client';
	common_fields: 'include' | 'exclude';
	optimistic_column_name: string;
	models: string[];
};
