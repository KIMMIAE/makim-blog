import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import { getSortedPostsData, Post } from "../lib/posts";

export default function Home({ allPostsData }: { allPostsData: Array<Post> }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home | makim</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1 className="text-3xl">Recent changes</h1>
        <div className="my-6 border-b-2"></div>
        {allPostsData.map((post: Post) => {
          return (
            <div key={post.id} className="pb-14">
              <time dateTime={post.date} className="text-base text-gray-500">
                {post.date}
              </time>
              <h2 className="text-2xl mt-1">
                <a href={post.slug}>{post.title}</a>
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
        })}
        <div className="text-center mb-14">
          <Link href="/pages/1" passHref>
            <button className="w-60 btn-primary">More</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const allPostsData: Post[] = getSortedPostsData().slice(0, 5);
  return {
    props: {
      allPostsData,
    },
  };
}
