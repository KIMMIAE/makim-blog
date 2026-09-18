import { Post, getSortedPostsData } from "../lib/Post";
import { HomeHero } from "../components/home/HomeHero";
import { RecentPosts } from "../components/home/RecentPosts";

const RECENT_POST_COUNT = 4;

export default async function Page() {
  const allPostsData: Post[] = await getSortedPostsData();
  const recentPosts = allPostsData.slice(0, RECENT_POST_COUNT);
  return (
    <div>
      <HomeHero />
      <RecentPosts posts={recentPosts} />
    </div>
  );
}
