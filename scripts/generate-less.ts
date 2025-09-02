// scripts/generate-less.ts
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { breakpoints } from "../src/constants/deviceBreakpoints";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type Breakpoints = Record<string, number>;

const content = Object.entries(breakpoints as Breakpoints)
  .map(([key, value]) => `@${key}: ${value}px;`)
  .join("\n");

const outputDir = path.resolve(__dirname, "../src/styles");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.resolve(outputDir, "deviceBreakpoints.less");
fs.writeFileSync(outputPath, content);

console.log("✅ Generated deviceBreakpoints.less from deviceBreakpoints.ts");
