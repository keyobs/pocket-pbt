import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";

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
        path.resolve(__dirname, "../../"),
      ],
    },
  },
  plugins: [
    react(),
    tsconfigPaths(),
  ],
  define: {
    __APP_VERSION__: JSON.stringify(APP_VERSION),
    __LAST_UPDATE_DATE__: JSON.stringify(LAST_COMMIT_DATE),
  },
  resolve: {
    alias: {
      "@styles": path.resolve(__dirname, "src/styles"),
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
