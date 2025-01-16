import react from '@astrojs/react';
// import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	vite: { plugins: [tailwindcss()] },
	integrations: [react()],
});
