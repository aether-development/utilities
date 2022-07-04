<div align="center">
<img src="https://github.com/aether-development/.github/blob/69ea94cf3c71445296dff428ad3bf8eeffccc72d/resources/Aether%20Development%20Logo.png" width="546" alt="aether-framework" />

# @aetherjs/eslint-config

**ESLint configuration for <u>Aether Development</u> projects.**

[![GitHub](https://img.shields.io/github/license/aether-development/utilities?color=5094c1&style=for-the-badge)](https://github.com/aether-development/utilities/blob/main/LICENSE.md)
[![NPM Version](https://img.shields.io/npm/v/@aetherjs/eslint-config?color=5a8dca&style=for-the-badge)](https://www.npmjs.com/package/@aetherjs/eslint-config)

</div>

## Installation
Install the package with one of the following commands below.
```yaml
# For NPM
npm install --save-dev @aetherjs/eslint-config

# For PNPM
pnpm add -D @aetherjs/eslint-config

# For YARN
yarn add -D @aetherjs/eslint-config
```

## Usage
Add the ESLint config to your `package.json`
```json
{
	"name": "my-project",
	"eslintConfig": {
		"extends": "@aetherjs"
	}
}
```

**Alternatively** add to your `eslintrc` / `eslintrc.json` / `eslintrc.js`
```json
{
	"extends": "@sapphire"
}
```

**Then** create an `tsconfig.eslint.jon` next to your `eslint` file with the following content.
```json
{
	"extends": "./tsconfig.json",
	"include": ["src"]
}
```

---


_This package was inspired by [@sapphire/eslint-config](https://github.com/sapphiredev/utilities/tree/main/packages/eslint-config)_
