<div align="center">
<img src="https://github.com/aether-development/.github/blob/69ea94cf3c71445296dff428ad3bf8eeffccc72d/resources/Aether%20Development%20Logo.png" width="546" alt="aether-framework" />

# @aetherjs/prettier-config

**Prettier configuration for <u>Aether Development</u> projects.**

[![GitHub](https://img.shields.io/github/license/aether-development/utilities?color=5094c1&style=for-the-badge)](https://github.com/aether-development/utilities/blob/main/LICENSE.md)
[![NPM Version](https://img.shields.io/npm/v/@aetherjs/prettier-config?color=5a8dca&style=for-the-badge)](https://www.npmjs.com/package/@aetherjs/prettier-config)

</div>

## Installation
Install the package with one of the following commands below.
```yaml
# For NPM
npm install --save-dev @aetherjs/prettier-config

# For PNPM
pnpm add -D @aetherjs/prettier-config

# For YARN
yarn add -D @aetherjs/prettier-config
```

## Usage
For `package.json`, add the following.
```json
{
    "name": "my-project",
    "prettier": "@aetherjs/prettier-config"
}
```

For `prettierrc.json`, add the following.
```json
{
    "extends": "@aetherjs"
}
```

For `prettierrc.js`, add the following.
```js
module.exports = require('@aetherjs/prettier-config')
```
**OR** to use with overrides, add the following.
```js
module.exports = {
    ...require('@aetherjs/prettier-config')
}
```
---


_This package was inspired by [@sapphire/prettier-config](https://github.com/sapphiredev/utilities/tree/main/packages/prettier-config)_
