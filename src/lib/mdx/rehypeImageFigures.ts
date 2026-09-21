import type { Root, Element, ElementContent } from "hast";
import { visit } from "unist-util-visit";

const isBlank = (n: ElementContent) => n.type === "text" && n.value.trim() === "";
const isEl = (n: ElementContent, tag: string): n is Element => n.type === "element" && n.tagName === tag;

/**
 * 마크다운 이미지는 `<p><img></p>` 로 렌더링되고, 이 블로그 글들은 그 아래 줄에 `*캡션*` 을 붙이는
 * 관례가 있어 `<p><img> <em>캡션</em></p>` 형태가 된다. 두 경우를 <figure> 로 바꾼다.
 *   - img 만: figure > img (+ alt 가 있으면 figcaption)
 *   - img + em: figure > img + figcaption(em 내용)
 * <p> 안에 <figure> 를 넣으면 HTML 파서가 <p> 를 닫아 하이드레이션이 어긋나므로 <p> 자체를 교체한다.
 */
export function rehypeImageFigures() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element, index, parent) => {
      if (node.tagName !== "p" || !parent || index === undefined) return;
      const kids = node.children.filter((c) => !isBlank(c));
      if (kids.length === 0 || !isEl(kids[0], "img")) return;
      const img = kids[0];
      let caption: ElementContent[] | null = null;
      if (kids.length === 1) {
        const alt = img.properties?.alt;
        caption = typeof alt === "string" && alt.trim() ? [{ type: "text", value: alt }] : null;
      } else if (kids.length === 2 && isEl(kids[1], "em")) {
        caption = kids[1].children;
      } else {
        return;
      }
      const figure: Element = {
        type: "element",
        tagName: "figure",
        properties: {},
        children: caption ? [img, { type: "element", tagName: "figcaption", properties: {}, children: caption }] : [img],
      };
      parent.children.splice(index, 1, figure);
    });
  };
}
