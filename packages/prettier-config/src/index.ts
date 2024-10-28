/** @typedef  {import("prettier").Config} PrettierConfig */
/** @typedef  {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */

/** @type { PrettierConfig | SortImportsConfig | TailwindConfig } */
const config = {
    plugins: ["@ianvs/prettier-plugin-sort-imports", "prettier-plugin-packagejson"],
    importOrder: [
        "<BUILTIN_MODULES>",
        "",
        "<TYPES>",
        "",
        "^(react/(.*)$)|^(react$)|^(react-native(.*)$)",
        "^(next/(.*)$)|^(next$)",
        "<THIRD_PARTY_MODULES>",
        "",
        "<TYPES>^@/(.*)$",
        "",
        "^@/(.*)$",
        "",
        "<TYPES>^[.|..|~]",
        "^~/",
        "^[../]",
        "^[./]",
    ],
    importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
    importOrderTypeScriptVersion: "4.4.0",
    tabWidth: 4,
    printWidth: 120,
    bracketSameLine: true,
};

export default config;
