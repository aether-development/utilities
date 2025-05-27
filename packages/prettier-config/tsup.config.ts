import { Options } from "tsup";

import { createTsupConfig } from "../../.configs/tsup.config";

const options: Options = { dts: false, sourcemap: false };

export default createTsupConfig({
	cjsOptions: options,
	esmOptions: options,
});
