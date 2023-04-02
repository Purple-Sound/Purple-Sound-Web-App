import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs'

import devConfig from './config.dev';
import prodConfig from './config.prod';

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const config = mode === 'production' ? prodConfig : devConfig;


// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': JSON.stringify(config),
  },
  plugins: [
    react(),
  ],
  optimizeDeps:{
    esbuildOptions:{
      plugins:[
        esbuildCommonjs(['lamejs'])
      ]
    }
  }
})
