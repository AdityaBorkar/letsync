import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	serverExternalPackages: [
		'@electric-sql/pglite-react', // Optional
		'@electric-sql/pglite',
	],
	reactStrictMode: false, // TODO - Remove this
};

export default nextConfig;
