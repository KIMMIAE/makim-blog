import type { Root, Element } from "hast";
import { visit } from "unist-util-visit";

const HEADING = /^h([1-6])$/;

/**
 * 글마다 제목 레벨 시작점이 다르다(`#` 로 시작하는 글, `##` 로 시작하는 글).
 * 본문 안에서 가장 높은 레벨을 h2 로 맞춰 페이지 h1(글 제목)과 충돌하지 않게 한다.
 * 이미 h2 부터 시작하면 그대로 둔다. h6 을 넘는 레벨은 h6 으로 고정.
 */
export function rehypeNormalizeHeadings() {
  return (tree: Root) => {
    let min = 7;
    visit(tree, "element", (node: Element) => {
      const m = HEADING.exec(node.tagName);
      if (m) min = Math.min(min, Number(m[1]));
    });
    const shift = 2 - min;
    if (min === 7 || shift <= 0) return;
    visit(tree, "element", (node: Element) => {
      const m = HEADING.exec(node.tagName);
      if (m) node.tagName = `h${Math.min(6, Number(m[1]) + shift)}`;
    });
  };
}
