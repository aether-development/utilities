import eslint from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import tseslint from 'typescript-eslint';

/**
 * All packages that leverage t3-env should use this rule
 */
export const restrictEnvAccess = tseslint.config(
	{ ignores: ['**/env.ts'] },
	{
		files: ['**/*.js', '**/*.ts', '**/*.tsx'],
		rules: {
			'no-restricted-properties': [
				'error',
				{
					object: 'process',
					property: 'env',
					message: "Use `import { env } from '~/env'` instead to ensure validated types.",
				},
			],
			'no-restricted-imports': [
				'error',
				{
					name: 'process',
					importNames: ['env'],
					message: "Use `import { env } from '~/env'` instead to ensure validated types.",
				},
			],
		},
	},
);

export default tseslint.config(
	{
		// Globally ignored files
		ignores: ['**/*.config.*'],
	},
	{
		files: ['**/*.js', '**/*.ts', '**/*.tsx'],
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
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
				},
			],
			'@typescript-eslint/consistent-type-imports': [
				'warn',
				{
					prefer: 'type-imports',
					fixStyle: 'separate-type-imports',
				},
			],
			'@typescript-eslint/no-unnecessary-condition': [
				'error',
				{
					allowConstantLoopConditions: true,
				},
			],
			'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],

			// Custom & Overrides
			'@typescript-eslint/no-unsafe-declaration-merging': 'off',
			'@typescript-eslint/no-duplicate-enum-values': 'off',
			'@typescript-eslint/no-empty-interface': 'off',
			'@typescript-eslint/no-namespace': 'off',
			'no-empty': ['error', { allowEmptyCatch: true }],

			// Rules enabled as 'warn' (potential improvements, less strict)
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-unsafe-member-access': 'warn',
			'@typescript-eslint/no-unsafe-assignment': 'warn',
			'@typescript-eslint/no-unsafe-call': 'warn',
			'@typescript-eslint/no-non-null-assertion': 'warn',
			'@typescript-eslint/dot-notation': 'warn',

			// Rules enabled as 'error' (likely bugs or critical issues)
			'@typescript-eslint/no-misused-promises': 'error',
		},
	},
	{
		linterOptions: {
			reportUnusedDisableDirectives: true,
		},
		languageOptions: {
			parserOptions: {
				project: true,
				extraFileExtensions: ['.json'],
			},
		},
	},
);
