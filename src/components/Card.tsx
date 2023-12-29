import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

interface ICard {
  className?: string;
  children: ReactNode;
  href: string;
}

interface ICardTitle {
  title: string;
  className?: string;
}

interface ICardDescription {
  desc: string;
  className?: string;
}

interface ICardTags {
  tags: string[];
  className?: string;
}

interface ICardTime {
  dateTime: string;
  decorate?: boolean;
}

interface ICardCta {
  name: string;
  ariaLabel: string;
}

export function Card({ className, href, children }: ICard) {
  return (
    <div
      className={clsx(
        className,
        "block p-6 bg-white rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer"
      )}
    >
      <Link href={`/${href}`} passHref>
        {children}
      </Link>
    </div>
  );
}

Card.Title = function CardTitle({ title, className }: ICardTitle) {
  return (
    <h2
      className={clsx(
        className,
        "mb-1 font-semibold text-zinc-800 dark:text-zinc-100"
      )}
    >
      {title}
    </h2>
  );
};

Card.Description = function CardDescription({
  desc,
  className,
}: ICardDescription) {
  return (
    <p
      className={clsx(
        className,
        "mt-2 font-normal text-gray-700 dark:text-gray-400"
      )}
    >
      {desc}
    </p>
  );
};

Card.Tags = function CardTags({ tags, className }: ICardTags) {
  const tags2 = tags.map((tag) => {
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
  return <div className="mb2">{tags2}</div>;
};

Card.Time = function CardTimeDecorator({
  dateTime,
  decorate = false,
}: ICardTime) {
  return (
    <time
      className={clsx("relative text-base text-gray-400", decorate && "pl-3.5")}
    >
      {dateTime}

      {decorate && (
        <span
          className="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
        >
          <span className="h-4 w-0.5 rounded-full bg-gray-200 dark:bg-gray-500" />
        </span>
      )}
    </time>
  );
};

Card.Cta = function CardCallToAction({ name, ariaLabel }: ICardCta) {
  return (
    <div className="text-blue-500" aria-label={ariaLabel}>
      {name}
    </div>
  );
};
