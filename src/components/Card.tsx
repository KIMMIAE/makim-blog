import clsx from "clsx";

interface ICardTags {
  tags: string[];
  className?: string;
}

/**
 * 글 상세 헤더의 태그 표시. 예전 목록용 Card 하위 컴포넌트(Card, Time, Title, Description, Cta)는
 * 목록 페이지가 components/list 로 이전되면서 제거했다.
 */
export const Card = {
  Tags: function CardTags({ tags, className }: ICardTags) {
    const result = tags.map((tag) => {
      return (
        <span
          key={tag}
          className={clsx(
            className,
            "first:ml-0 ml-2.5 px-1 text-blue-500 bg-blue-200 text-center"
          )}
        >
          {tag}
        </span>
      );
    });
    return <div className="mb-2">{result}</div>;
  },
};
