import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJson = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url), "utf-8")
);
const APP_VERSION = packageJson.version;

let LAST_COMMIT_DATE = "N/A";
try {
  const isoDate = execSync("git log -1 --format=%cI").toString().trim();
  const date = new Date(isoDate);
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  LAST_COMMIT_DATE = `${month} ${year}`;
} catch (error) {
  console.warn("Could not get last commit date:", error);
}

const isNetlify = process.env.NETLIFY === "true";
const basePath = isNetlify ? "" : "/pocket-pbt/";

export default defineConfig({
  base: basePath,
  server: {
    fs: {
      allow: [
        // 👇 allow vite to read from outside the app folder
        path.resolve(__dirname, "../../"),
      ],
    },
  },
  plugins: [
    react(),
    tsconfigPaths({
      root: path.resolve(__dirname, "../../"),
      projects: [
        path.resolve(__dirname, "tsconfig.json"),
        path.resolve(__dirname, "../../tsconfig.json"),
      ],
    }),
  ],
  define: {
    __APP_VERSION__: JSON.stringify(APP_VERSION),
    __LAST_UPDATE_DATE__: JSON.stringify(LAST_COMMIT_DATE),
  },
  resolve: {
    alias: {
      "@styles": path.resolve(__dirname, "src/styles"),
      "@hooks": path.resolve(__dirname, "../../packages/core/hooks"),
      "@utils": path.resolve(__dirname, "../../packages/core/utils"),
      "@constants": path.resolve(__dirname, "../../packages/core/constants"),
      "@api": path.resolve(__dirname, "../../packages/core/api"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
  },
  css: {
    preprocessorOptions: {
      less: {
        paths: [path.resolve(__dirname, "src")],
      },
    },
  },
});
