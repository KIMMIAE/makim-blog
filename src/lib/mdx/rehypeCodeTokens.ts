import type { Root, Element } from "hast";
import { visit } from "unist-util-visit";

/**
 * Prism 토큰 클래스(`token keyword module` 등)를 색 의미 단위의 클래스(`token token-control`)로 바꾼다.
 * 색은 styles/code.css 에서 VS Code Dark+ 팔레트 토큰(--sm-code-*)으로 정의한다.
 */
export type SemanticToken =
  | "comment" | "punctuation" | "operator" | "keyword" | "control" | "string" | "number"
  | "function" | "type" | "variable" | "constant" | "tag" | "attr" | "regex" | "selector"
  | "inserted" | "deleted";

const MAP: Record<string, SemanticToken> = {
  comment: "comment", prolog: "comment", doctype: "comment", cdata: "comment", shebang: "comment",
  punctuation: "punctuation", operator: "operator", "interpolation-punctuation": "keyword", "template-punctuation": "string",
  keyword: "keyword", important: "keyword", boolean: "keyword", null: "keyword", nil: "keyword", entity: "keyword",
  atrule: "control", "control-flow": "control", module: "control",
  // C/Obj-C 전처리기: `#import <Foo.h>` → 지시문은 보라, 헤더 경로는 문자열
  macro: "control", directive: "control", "directive-hash": "control", expression: "string",
  string: "string", char: "string", url: "string", "attr-value": "string", "template-string": "string",
  number: "number", symbol: "number",
  function: "function", "function-variable": "function", method: "function",
  "class-name": "type", "maybe-class-name": "type", builtin: "type", namespace: "type",
  variable: "variable", parameter: "variable", property: "variable", "property-access": "variable", "assign-left": "variable",
  constant: "constant", environment: "constant",
  tag: "tag", "attr-name": "attr", selector: "selector", regex: "regex",
  inserted: "inserted", deleted: "deleted",
};

/** 여러 클래스가 함께 붙을 때 우선하는 의미 (예: `keyword module` → control) */
const PRIORITY: string[] = ["control-flow", "module", "atrule", "directive-hash", "directive", "expression", "deleted", "inserted", "regex", "class-name", "maybe-class-name", "function", "function-variable", "string", "attr-value", "attr-name", "tag", "selector", "constant", "number", "keyword", "boolean", "variable", "parameter", "property", "builtin", "comment", "operator", "punctuation"];

export function rehypeCodeTokens() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      const cls = node.properties?.className;
      if (!Array.isArray(cls) || cls[0] !== "token") return;
      const types = cls.slice(1).map(String);
      const picked = PRIORITY.find((t) => types.includes(t)) ?? types.find((t) => t in MAP);
      const semantic = picked ? MAP[picked] : undefined;
      node.properties.className = semantic ? ["token", `token-${semantic}`] : ["token"];
    });
  };
}
