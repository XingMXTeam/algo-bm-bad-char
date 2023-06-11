import   { BM_BC_TestFunction, BMTestFunction, kmp_TestFunction, trie_TestFunction, rk_TestFunction, ac_TestFunction } from "./index";
import {  expect, test } from 'vitest'


test("文本编辑器的查找与替换： BM - bad char - it works", () => {
  expect(BM_BC_TestFunction()).toBe(5);
});


test("文本编辑器的查找与替换：BM - it works", () => {
  expect(BMTestFunction()).toBe(5);
});


test("文本编辑器的查找与替换: rk - it works", () => {
  expect(rk_TestFunction()).toBe(1);
});

test("文本编辑器的查找与替换：kmp - it works", () => {
  expect(kmp_TestFunction()).toBe(5);
});

test("搜索关键词提示功能：trie - it works", () => {
  expect(trie_TestFunction()).toBe(true);
});

test("敏感词过滤：ac - it works", () => {
  expect(ac_TestFunction()).toBe(null);
});
