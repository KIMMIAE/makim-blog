import Link from "next/link";
import styles from "../../styles/Home.module.css";
import { Card } from "../components/Card";
import { Post, getSortedPostsData } from "../lib/Post";

export default async function Page() {
  const allPostsData: Post[] = await getSortedPostsData()
  const recentPosts = allPostsData.slice(0, 5);
  return (
    <div className={styles.container}>
      <div>
        <h1 className="text-3xl">Recent changes</h1>
        <div className="my-6 border-b-2"></div>
        <div className="flex flex-col gap-4">
          {recentPosts.map((post: Post) => {
            return (
              <Card key={post.id} href={post.slug}>
                <Card.Time dateTime={post.date} decorate></Card.Time>
                <Card.Title title={post.title} className="mt-1 text-2xl" />
                <Card.Tags tags={post.tags} />
                <Card.Description desc={post.description} className="mb-2" />
                <Card.Cta name="Read More &rarr;" ariaLabel="Read More" />
              </Card>
            );
          })}
        </div>
        <div className="text-center my-14">
          <Link href="/posts/1" passHref>
            <button className="w-60 btn-primary">More</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
