<div align="center">
<img src="https://github.com/aether-development/.github/blob/69ea94cf3c71445296dff428ad3bf8eeffccc72d/resources/Aether%20Development%20Logo.png" width="546" alt="aether-framework" />

# @aetherjs/ts-config

**Typescript configuration for <u>Aether Development</u> projects.**

[![GitHub](https://img.shields.io/github/license/aether-development/utilities?color=5094c1&style=for-the-badge)](https://github.com/aether-development/utilities/blob/main/LICENSE.md)
[![NPM Version](https://img.shields.io/npm/v/@aetherjs/ts-config?color=5a8dca&style=for-the-badge)](https://www.npmjs.com/package/@aetherjs/ts-config)

</div>

## Installation
Install the package with one of the following commands below.
```yaml
# For NPM
npm install --save-dev @aetherjs/ts-config

# For PNPM
pnpm add -D @aetherjs/ts-config

# For YARN
yarn add -D @aetherjs/ts-config
```

## Usage
Add the following to your `tsconfig.json` file.
```json
{
    "extends": "@aetherjs/ts-config"
}
```

_Below is a copy of the configuration for easy viewing._
```json
{
    "compileOnSave": true,
    "compilerOptions": {
        "allowSyntheticDefaultImports": true,
        "alwaysStrict": true,
        "declaration": true,
        "declarationMap": true,
        "emitDecoratorMetadata": false,
        "esModuleInterop": true,
        "experimentalDecorators": true,
        "forceConsistentCasingInFileNames": true,
        "importHelpers": true,
        "importsNotUsedAsValues": "error",
        "incremental": true,
        "lib": ["esnext"],
        "module": "CommonJS",
        "moduleResolution": "Node",
        "newLine": "lf",
        "noEmitHelpers": true,
        "noFallthroughCasesInSwitch": true,
        "noImplicitReturns": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "preserveConstEnums": true,
        "pretty": true,
        "removeComments": false,
        "resolveJsonModule": true,
        "sourceMap": true,
        "strict": true,
        "target": "ES2020",
        "useDefineForClassFields": true
    }
}
```
---


_This package was inspired by [@sapphire/ts-config](https://github.com/sapphiredev/utilities/tree/main/packages/ts-config)_
