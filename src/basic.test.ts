import   { BMTestFunction } from "./index";
import { assert, expect, test } from 'vitest'


test("BM - it works", () => {
  expect(BMTestFunction()).toBe(5);
});
