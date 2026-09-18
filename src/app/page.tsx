import { Post, getSortedPostsData, getTagSummaries } from "../lib/Post";
import { HomeHero } from "../components/home/HomeHero";
import { RecentPosts } from "../components/home/RecentPosts";
import { TopicList } from "../components/home/TopicList";

const RECENT_POST_COUNT = 4;
const TOPIC_COUNT = 5;

export default async function Page() {
  const [allPostsData, tagSummaries] = await Promise.all([getSortedPostsData(), getTagSummaries()]);
  const recentPosts: Post[] = allPostsData.slice(0, RECENT_POST_COUNT);
  const topics = tagSummaries.slice(0, TOPIC_COUNT);
  return (
    <div>
      <HomeHero />
      <RecentPosts posts={recentPosts} aside={<TopicList tags={topics} />} />
    </div>
  );
}
