import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";
import type { Root, Element } from "hast";
import { visit } from "unist-util-visit";

const PUBLIC_DIR = path.resolve("./public");

/**
 * 글 본문의 로컬 이미지(`/YYYY/MM/images/…`)에 빌드 시 width/height 를 넣는다.
 * 크기가 있어야 next/image 최적화와 레이아웃 시프트 방지가 가능하다. 외부 URL 은 건너뛴다.
 */
export function rehypeImageSize() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "img") return;
      const src = node.properties?.src;
      if (typeof src !== "string" || !src.startsWith("/") || node.properties.width) return;
      const file = path.join(PUBLIC_DIR, decodeURIComponent(src.split("?")[0]));
      if (!file.startsWith(PUBLIC_DIR) || !existsSync(file)) return;
      try {
        const { width, height } = imageSize(readFileSync(file));
        if (width && height) {
          node.properties.width = width;
          node.properties.height = height;
        }
      } catch {
        /* 읽을 수 없는 파일은 크기 없이 둔다 */
      }
    });
  };
}
