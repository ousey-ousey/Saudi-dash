/* eslint-env node */
import { ESLint } from "eslint";

export default function eslintPlugin(options = {}) {
  const include =
    Array.isArray(options.include) && options.include.length > 0
      ? options.include
      : ["src"];

  const eslint = new ESLint({ cwd: process.cwd() });

  async function runLint(targets) {
    try {
      const results = await eslint.lintFiles(targets);
      const formatter = await eslint.loadFormatter("stylish");
      const output = formatter.format(results);
      if (output && output.trim().length > 0) {
        console.log(output);
      }
    } catch (error) {
      console.warn('ESLint warning:', error.message);
    }
  }

  return {
    name: "custom-eslint",
    async buildStart() {
      await runLint(include);
    },
    async configureServer() {
      await runLint(include);
    },
  };
}
