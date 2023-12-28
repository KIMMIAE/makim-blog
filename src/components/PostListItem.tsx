import Link from "next/link";
import { Post } from "../lib/api";

export default function PostListItem({ post }: { post: Post }) {
  return (
    <div key={post.id} className="pb-14">
      <time dateTime={post.date} className="text-base text-gray-500">
        {post.date}
      </time>
      <h2 className="mt-1 text-2xl">
        <Link href={`/${post.slug}`} passHref>{post.title}</Link>
      </h2>
      <div className="mb-2">
        {post.tags?.map((tag) => {
          return (
            <span key={tag} className="first:pl-0 pl-2.5">
              #{tag}
            </span>
          );
        })}
      </div>
      <p>{post.description}</p>
    </div>
  );
}
