import type { Root, Element } from "hast";
import { visit } from "unist-util-visit";
import { SITE_URL } from "../site";

const siteHost = new URL(SITE_URL).host;

/**
 * 본문의 외부 링크(다른 호스트로 가는 http/https)에 rel="noopener noreferrer" 를 붙인다.
 * 새 탭(target=_blank) 은 열지 않는다(결정 external-target = rel 만). 내부·앵커·상대 링크는 건드리지 않는다.
 */
export function rehypeExternalLinks() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "a") return;
      const href = node.properties?.href;
      if (typeof href !== "string" || !/^https?:\/\//i.test(href)) return;
      let host = "";
      try {
        host = new URL(href).host;
      } catch {
        return;
      }
      if (host === siteHost) return;
      // hast 에서 rel 은 공백 구분 토큰 배열이다
      const existing = Array.isArray(node.properties.rel) ? node.properties.rel.map(String) : [];
      node.properties.rel = [...new Set([...existing, "noopener", "noreferrer"])];
    });
  };
}
