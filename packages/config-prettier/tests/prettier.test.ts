import prettierConfig from "../src";
import { describe, test, expect } from "vitest";

describe("Prettier Config", () => {
	test("should export rules", () => {
		expect(prettierConfig.$schema).toBe("http://json.schemastore.org/prettierrc");
		expect(prettierConfig.useTabs).toBe(true);
		expect(prettierConfig).toMatchSnapshot();
	});
});
