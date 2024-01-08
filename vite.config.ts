// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import path from 'path';

// import tsconfig from './tsconfig.json';

// const SRC_PATH = path.resolve(__dirname, 'src');

// const parseTsConfigPaths = (paths: Record<string, string[]>): Record<string, string> => {
//   const webpackConfigAliases: Record<string, string> = {};

//   Object.entries(paths).forEach(([alias, paths]) => {
//     const aliasPath = paths[0].replace(/[^a-zA-Z]/g, '');

//     webpackConfigAliases[alias] = path.join(SRC_PATH, aliasPath);
//   });

//   return webpackConfigAliases;
// };

// // https://vitejs.dev/config/
// export default defineConfig({
//   base: "/",
//   plugins: [react()],
  // resolve: {
  //   alias: parseTsConfigPaths(tsconfig.compilerOptions.paths),
  // },
// })


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path';

import tsconfig from './tsconfig.json';

const SRC_PATH = path.resolve(__dirname, 'src');
const parseTsConfigPaths = (paths: Record<string, string[]>): Record<string, string> => {
  const webpackConfigAliases: Record<string, string> = {};

  Object.entries(paths).forEach(([alias, paths]) => {
    const aliasPath = paths[0].replace(/[^a-zA-Z]/g, '');

    webpackConfigAliases[alias] = path.join(SRC_PATH, aliasPath);
  });

  return webpackConfigAliases;
};

// https://vitejs.dev/config/
export default defineConfig({
  server: { port: 3000 },
  base: "/",
  plugins: [react()],
  resolve: {
    alias: parseTsConfigPaths(tsconfig.compilerOptions.paths),
  },
});