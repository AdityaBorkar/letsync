import type { NextConfig } from 'next';
// import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin';

const nextConfig: NextConfig = {
	serverExternalPackages: [
		'@electric-sql/pglite-react', // Optional
		'@electric-sql/pglite',
	],
	reactStrictMode: false, // TODO - Remove this
	// webpack: (config, { isServer }) => {
	// 	if (isServer) {
	// 		config.plugins = [...config.plugins, new PrismaPlugin()];
	// 	}
	// 	return config;
	// },
};

export default nextConfig;
