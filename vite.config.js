import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
    // GitHub Pages 项目站点部署在 /<仓库名>/ 下，资源路径必须带上这个前缀
    base: '/task-hub/',
    plugins: [
        vue(),
        tailwindcss(),
        viteCompression({
            threshold: 10240,
            algorithm: 'gzip',
            ext: '.gz'
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    // 将 vue 相关库打包在一起（当前 Vite 8 / Rolldown 只接受函数形式）
                    if (/[\\/]node_modules[\\/](vue|vue-router|pinia|@vue)[\\/]/.test(id)) {
                        return 'vue-vendor'
                    }
                }
            }
        }
    }
})
