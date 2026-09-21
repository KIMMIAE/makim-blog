import type { Root, Element, ElementContent } from "hast";
import { visit } from "unist-util-visit";

export interface TocItem {
  id: string;
  text: string;
  /** 2 = h2, 3 = h3 */
  depth: 2 | 3;
}

/** 요소 아래의 텍스트만 이어 붙인다 (인라인 코드·강조 포함, 태그 제외). */
function textOf(node: Element | ElementContent): string {
  if (node.type === "text") return node.value;
  if ("children" in node) return node.children.map(textOf).join("");
  return "";
}

/**
 * rehype-slug 로 id 가 붙은 뒤 h2·h3 를 순서대로 `items` 에 채운다.
 * compileMDX 는 컴파일 결과 외의 값을 돌려주지 않으므로 호출 측 배열을 캡처하는 팩토리 형태다.
 */
export function rehypeCollectToc(items: TocItem[]) {
  return function plugin() {
    return (tree: Root) => {
      visit(tree, "element", (node: Element) => {
        if (node.tagName !== "h2" && node.tagName !== "h3") return;
        const id = node.properties?.id;
        if (typeof id !== "string" || !id) return;
        items.push({ id, text: textOf(node).trim(), depth: node.tagName === "h2" ? 2 : 3 });
      });
    };
  };
}
