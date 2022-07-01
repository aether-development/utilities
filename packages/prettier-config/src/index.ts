import type { PrettierSchema } from "./schema";

const prettierConfig: PrettierSchema = {
	$schema: "http://json.schemastore.org/prettierrc",
	endOfLine: "lf",
	printWidth: 200,
	quoteProps: "as-needed",
	semi: true,
	singleQuote: false,
	tabWidth: 4,
	trailingComma: "none",
	useTabs: true,
	overrides: [
		{
			files: ".all-contributorsrc",
			options: {
				parser: "json"
			}
		},
		{
			files: "*.yml",
			options: {
				tabWidth: 2,
				useTabs: false
			}
		}
	]
};

module.exports = prettierConfig;
