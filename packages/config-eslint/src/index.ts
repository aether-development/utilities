const eslintConfig = {
	root: true,
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: "module",
		project: "./tsconfig.eslint.json",
		extraFileExtensions: [".mjs"]
	},
	extends: ["plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
	env: {
		node: true,
		es6: true,
		es2017: true,
		es2020: true,
		jest: true,
		browser: true,
		commonjs: true
	}
};

module.exports = eslintConfig;
