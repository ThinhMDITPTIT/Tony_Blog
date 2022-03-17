import type { NextPage } from 'next';
import Head from 'next/head';
import { getPosts } from '../services';
import { PostCard, Categories, PostWidget } from '../components';

const Home: NextPage = ({ posts }: any) => {
  return (
    <div className="container mx-auto mb-8 px-10">
      <Head>
        <title>Tony Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post: any, index: any) => (
            <PostCard post={post.node} key={index} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <PostWidget slug={undefined} categories={undefined} />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

// The way to fetch data using getStaticProps in NextJS
export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props: { posts },
  };
}

export default Home;
