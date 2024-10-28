import eslint from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import tseslint from "typescript-eslint";

/**
 * All packages that leverage t3-env should use this rule
 */
export const restrictEnvAccess = tseslint.config(
    { ignores: ["**/env.ts"] },
    {
        files: ["**/*.js", "**/*.ts", "**/*.tsx"],
        rules: {
            "no-restricted-properties": [
                "error",
                {
                    object: "process",
                    property: "env",
                    message:
                        "Use `import { env } from '~/env'` instead to ensure validated types.",
                },
            ],
            "no-restricted-imports": [
                "error",
                {
                    name: "process",
                    importNames: ["env"],
                    message:
                        "Use `import { env } from '~/env'` instead to ensure validated types.",
                },
            ],
        },
    },
);

export default tseslint.config(
    {
        // Globally ignored files
        ignores: ["**/*.config.*"],
    },
    {
        files: ["**/*.js", "**/*.ts", "**/*.tsx"],
        plugins: {
            import: importPlugin,
            prettier: prettierPlugin,
        },
        extends: [
            eslint.configs.recommended,
            ...tseslint.configs.recommended,
            ...tseslint.configs.recommendedTypeChecked,
            ...tseslint.configs.stylisticTypeChecked,
        ],
        rules: {
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                },
            ],
            "@typescript-eslint/consistent-type-imports": [
                "warn",
                {
                    prefer: "type-imports",
                    fixStyle: "separate-type-imports",
                },
            ],
            "@typescript-eslint/no-unnecessary-condition": [
                "error",
                {
                    allowConstantLoopConditions: true,
                },
            ],
            "import/consistent-type-specifier-style": [
                "error",
                "prefer-top-level",
            ],

            // Custom
            "@typescript-eslint/no-unsafe-declaration-merging": "off",
            "@typescript-eslint/no-duplicate-enum-values": "off",
            "@typescript-eslint/no-unsafe-member-access": "off",
            "@typescript-eslint/no-non-null-assertion": "off",
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-empty-interface": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unsafe-call": "off",
            "@typescript-eslint/dot-notation": "off",
            "@typescript-eslint/no-namespace": "off",
            "no-empty": ["error", { allowEmptyCatch: true }],

            // Temporary
            "@typescript-eslint/no-misused-promises": "off",
        },
    },
    {
        linterOptions: {
            reportUnusedDisableDirectives: true,
        },
        languageOptions: {
            parserOptions: {
                project: true,
                extraFileExtensions: [".json"],
            },
        },
    },
);
