import   { BM_BC_TestFunction, BMTestFunction, kmp_TestFunction, trie_TestFunction } from "./index";
import {  expect, test } from 'vitest'


test("BM - bad char - it works", () => {
  expect(BM_BC_TestFunction()).toBe(5);
});


test("BM - it works", () => {
  expect(BMTestFunction()).toBe(5);
});

test("kmp - it works", () => {
  expect(kmp_TestFunction()).toBe(5);
});

test("trie - exact match", () => {
  expect(trie_TestFunction()).toBe(true);
});
