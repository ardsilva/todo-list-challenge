/// <reference types="vitest" />
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/__tests__/setup.ts',
		css: true,
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	esbuild: {
		drop: ['console', 'debugger'],
	},
	build: {
		sourcemap: false,
		target: 'es2019',
		cssCodeSplit: true,
		reportCompressedSize: true,
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ['react', 'react-dom'],
					'react-day-picker': ['react-day-picker'],
					icons: ['lucide-react'],
					radix: [
						'@radix-ui/react-alert-dialog',
						'@radix-ui/react-dialog',
						'@radix-ui/react-dropdown-menu',
						'@radix-ui/react-label',
						'@radix-ui/react-popover',
						'@radix-ui/react-separator',
						'@radix-ui/react-slot',
					],
					sonner: ['sonner'],
				},
			},
		},
	},
});
