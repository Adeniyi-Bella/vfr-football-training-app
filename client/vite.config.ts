// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import path from 'node:path'
// import autoprefixer from 'autoprefixer'

// export default defineConfig(() => {
//   return {
//     base: './',
//     build: {
//       outDir: 'build',
//     },
//     css: {
//       postcss: {
//         plugins: [
//           autoprefixer({}), // add options if needed
//         ],
//       },
//     },
//     esbuild: {
//       loader: 'jsx',
//       include: /src\/.*\.jsx?$/,
//       exclude: [],
//     },
//     optimizeDeps: {
//       force: true,
//       esbuildOptions: {
//         loader: {
//           '.js': 'jsx',
//         },
//       },
//     },
//     plugins: [react()],
//     resolve: {
//       alias: [
//         {
//           find: 'src/',
//           replacement: `${path.resolve(__dirname, 'src')}/`,
//         },
//       ],
//       extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.scss'],
//     },
//     server: {
//       port: 3000,
//       proxy: {
//         // https://vitejs.dev/config/server-options.html
//       },
//     },
//   }
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    // visualizer({
    //   template: 'treemap',
    //   open: true,
    //   gzipSize: true,
    //   brotliSize: true,
    //   filename: 'analyse.html',
    // }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.split('node_modules/')[1].split('/')[0].toString()
          }
        },
      },
    },
  },
  preview: {
    port: 4500,
  },
  server: {
    port: 4500,
  },
})
