import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs'

import devConfig from './config.dev';
import prodConfig from './config.prod';

let config;

// if(import.meta.env.MODE) {
//   config = import.meta.env.MODE === 'production' ? prodConfig : devConfig;
// }

if(process.env.MODE){
  config = process.env.MODE === 'production' ? prodConfig : devConfig;
}

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': config,
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
