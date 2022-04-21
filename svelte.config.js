import adapter from "@sveltejs/adapter-auto";
import preprocess from "svelte-preprocess";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const filePath = dirname(fileURLToPath(import.meta.url));
const sassPath = `${filePath}/src/styles/`;

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({}),

  kit: {
    adapter: adapter(),
    vite: {
      resolve: {
        alias: {
          $styles: path.resolve("./src/styles"),
          "@airgap/beacon-sdk": path.resolve(
            path.resolve(),
            `./node_modules/@airgap/beacon-sdk/dist/walletbeacon.min.js`
          ),
          // polyfills
          "readable-stream": "vite-compatible-readable-stream",
          stream: "vite-compatible-readable-stream"
        }
      },
      optimizeDeps: {
        esbuildOptions: {
          define: {
            global: "globalThis",
            process: JSON.stringify({
              env: {
                NODE_DEBUG: ""
              }
            })
          }
        }
      }
    }
  }
};

export default config;