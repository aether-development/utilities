import { Options } from 'tsup';

import { createTsupConfig } from '../../tsup.config';

const options: Options = { dts: false, sourcemap: false, entry: ['src/base.ts', 'src/nextjs.ts', 'src/react.ts'] };

export default createTsupConfig({
	cjsOptions: options,
	esmOptions: options,
});
