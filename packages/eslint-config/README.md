<div align="center">
<img src="https://raw.githubusercontent.com/aether-development/.github/d75ee364dfd4683e01baedc97256f536bb40f0a9/assets/AetherDevelopmentLogo.png" width="546" alt="aether-framework" />

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

# For Bun
bun add -D @aetherjs/eslint-config
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
	"extends": "@aetherjs"
}
```

**Then** create an `tsconfig.eslint.json` next to your `eslint` file with the following content.

```json
{
	"extends": "./tsconfig.json",
	"include": ["src"]
}
```

---

_This package was inspired by [@sapphire/eslint-config](https://github.com/sapphiredev/utilities/tree/main/packages/eslint-config)_
