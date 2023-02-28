/// <reference types="vitest" />
import { fileURLToPath, URL } from 'node:url'

import { defineConfig, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		splitVendorChunkPlugin(),
		vue({
			template: {
				transformAssetUrls: {
					includeAbsolute: false
				}
			}
		})
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	test: {
		globals: true,
		environment: 'jsdom',
		coverage: {
			provider: 'c8'
		}
	}
})
