// @ts-expect-error This file in the eyes of vitest is a module.
import eslintConfig from "../src";
import { describe, test, expect } from "vitest";

describe("ESLint Config", () => {
	test("should export rules", () => {
		expect(eslintConfig.root).toBe(true);
		expect(eslintConfig.parser).toBe("@typescript-eslint/parser");
		expect(eslintConfig).toMatchSnapshot();
	});
});
