import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import Header from "../components/header";
import { getSortedPostsData, Post } from "../lib/posts";

export default function Home({ allPostsData }: { allPostsData: Array<Post> }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home | makim</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-3xl px-4 mx-auto sm:px-6 xl:max-w-5xl xl:px-0">
        <Header></Header>
        <div>
          <h1 className="text-3xl">Recent changes</h1>
          <div className="my-6 border-b-2"></div>
          {allPostsData.map((post: Post) => {
            return (
              <div key={post.id} className="pb-14">
                <h2 className="text-2xl">
                  {post.id}
                </h2>
                <div>
                  {post.tags.map((tag) => {
                    return (
                      <span key={tag} className="first:pl-0 pl-2.5">#{tag}</span>
                    )
                  })}
                </div>
                <p>
                  글에 대한 간단한 description이 들어간다. desc 따로 적어줄지,
                  아니면 기존 글 내용 몇줄 정도 잘라서 보여준지는 아직 정하지
                  못했음. 호버 했을 때 재밌는 효과를 주고 싶다. 가능할까?
                </p>
              </div>
            );
          })}
          <div className="text-center mb-14">
            <button className="w-60 btn-primary">More</button>
          </div>
        </div>
      </div>
      {/* TODO: footer 컴포넌트로 분리 */}
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const allPostsData: Post[] = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
