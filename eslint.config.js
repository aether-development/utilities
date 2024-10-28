import baseConfig from "./packages/eslint-config/src/base.js";

/** @type {import('typescript-eslint').Config} */
export default [
    {
        ignores: ["**/dist/**", "**/scripts/**"],
    },
    ...baseConfig,
];
