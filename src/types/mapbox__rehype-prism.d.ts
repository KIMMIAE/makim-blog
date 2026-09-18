// @mapbox/rehype-prism 은 자체 타입을 제공하지 않고, DefinitelyTyped 의 @types 패키지는
// unified v10 기준이어서 MDX v3(unified v11) 의 Pluggable 타입과 충돌한다.
// 이 프로젝트에서 필요한 최소 시그니처만 선언한다.
declare module "@mapbox/rehype-prism" {
  interface RehypePrismOptions {
    /** 지원하지 않는 언어를 만나도 에러를 내지 않는다 */
    ignoreMissing?: boolean;
    /** 언어 별칭 매핑 (예: { javascript: ["js"] }) */
    alias?: Record<string, string | string[]>;
  }

  function rehypePrism(options?: RehypePrismOptions): (tree: unknown) => void;

  export default rehypePrism;
}
