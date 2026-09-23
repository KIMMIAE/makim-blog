/**
 * schema.org JSON-LD 를 <script type="application/ld+json"> 로 출력한다.
 * `<` 를 이스케이프해 본문 문자열에 "</script>" 가 들어와도 스크립트가 닫히지 않게 한다.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
