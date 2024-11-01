/** @typedef  {import("prettier").Config} PrettierConfig */
/** @typedef  {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */

/** @type { PrettierConfig | SortImportsConfig | TailwindConfig } */
const config = {
	plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-packagejson'],
	importOrder: [
		'<BUILTIN_MODULES>',
		'',
		'<TYPES>',
		'',
		'^(react/(.*)$)|^(react$)|^(react-native(.*)$)',
		'^(next/(.*)$)|^(next$)',
		'<THIRD_PARTY_MODULES>',
		'',
		'<TYPES>^@/(.*)$',
		'',
		'^@/(.*)$',
		'',
		'<TYPES>^[.|..|~]',
		'^~/',
		'^[../]',
		'^[./]',
	],
	importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
	importOrderTypeScriptVersion: '4.4.0',
	tabWidth: 4,
	useTabs: true,
	printWidth: 150,
	singleQuote: true,
	quoteProps: 'as-needed',
	bracketSameLine: true,
	endOfLine: 'lf',
	overrides: [
		{
			files: '*.yml',
			options: {
				tabWidth: 2,
				useTabs: false,
			},
		},
		{
			files: 'package.json',
			options: {
				packageSortOrder: [
					'name',
					'version',
					'description',
					'author',
					'license',
					'type',
					'main',
					'module',
					'types',
					'exports',
					'sideEffects',
					'scripts',
					'dependencies',
					'devDependencies',
					'peerDependencies',
					'repository',
					'bugs',
					'homepage',
					'keywords',
				],
			},
		},
	],
};

export default config;
