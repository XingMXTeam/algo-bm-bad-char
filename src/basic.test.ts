import { TestFunction } from "./index";
import { assert, expect, test } from 'vitest'

test("it works", () => {
  expect(TestFunction()).toBe(5);
});
