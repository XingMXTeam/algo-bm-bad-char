import {
  BM_BC_TestFunction,
  BMTestFunction,
  kmp_TestFunction,
  trie_TestFunction,
  rk_TestFunction,
  ac_TestFunction,
  hf_TestFunction,
  ms_test_function,
  dy_test_function,
  // graph_test_function
} from "./index";
import { expect, test } from "vitest";
import {SkipList} from "./社交网络关系/skipList";

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

test("文件压缩：hf - it works", () => {
  expect(hf_TestFunction()).toBe(null);
});

test("海量数据处理: merge sort - it works", () => {
  expect(ms_test_function()).toBe(true);
});

test("双11凑单问题: dy - it works", () => {
  expect(dy_test_function()).toBe(true);
});
test("测试跳表: skipList - it works", () => {
  const skipList = new SkipList();
  skipList.insert(1)
  skipList.insert(2)
  skipList.insert(3)
  skipList.insert(4)
  skipList.insert(5)
  skipList.printAll()
});

// test("社交网络关系: graph - it works", () => {
//   expect(graph_test_function()).toBe(true);
// });