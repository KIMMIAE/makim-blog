import { getAllTags } from "../../lib/Post";
import Link from "next/link";

export const metadata = {
  title: "Tags - 개발이 재밌는 날",
  description: "블로그의 모든 태그 목록",
};

export default async function TagsPage() {
  const tagCount = await getAllTags();
  const sortedTags = Object.entries(tagCount).sort((a, b) => b[1] - a[1]);

  return (
    <div>
      <h1 className="text-3xl">Tags</h1>
      <div className="my-6 border-b-2"></div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedTags.map(([tag, count]) => (
          <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag)}`}
            className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium text-blue-600 dark:text-blue-400">
                #{tag}
              </span>
              <span className="px-2 py-1 text-sm bg-gray-200 text-gray-700 rounded-full dark:bg-gray-700 dark:text-gray-300">
                {count}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 