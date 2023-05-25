import   { BM_BC_TestFunction, BMTestFunction } from "./index";
import { assert, expect, test } from 'vitest'


test("BM - bad char - it works", () => {
  expect(BM_BC_TestFunction()).toBe(5);
});


test("BM - it works", () => {
  expect(BMTestFunction()).toBe(5);
});
