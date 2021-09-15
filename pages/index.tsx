import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { PopularPosts } from '../components/post';
import { PropsIndexType } from '../util';

export const Home: NextPage<PropsIndexType> = ({ after, before, posts }: PropsIndexType): JSX.Element => {
  return (
    <>
      <Head>
        <title>Reddit Clone</title>
        <meta name="description" content="Reddit Clone" />
        <link rel="icon" href="/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>
      <PopularPosts after={after} before={before} posts={posts} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const { query } = context;
  // const criteria = parseSearchCriteria(query.search);
  // if (!criteria || (criteria && criteria.length === 0)) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //   };
  // }
  const internalApi = process.env.INTERNAL_API || 'http://localhost:3000';
  // const response = await fetch(`${internalApi}/api/items?q=${criteria}`);
  const response = await fetch(`${internalApi}/api/getTopPost`);
  const results = await response.json();

  return {
    props: {
      // search: criteria || null,
      after: results.data.after || '',
      before: results.data.before || '',
      posts: results.data.posts || [],
    },
  };
};

export default Home;
