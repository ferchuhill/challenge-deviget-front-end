import type { NextPage } from 'next';
import Head from 'next/head';
import { PopularPosts } from '../components/post';

// Principal page "/".

export const Home: NextPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Reddit Clone</title>
        <meta name="description" content="Reddit Clone" />
        <link rel="icon" href="/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>
      <PopularPosts />
    </>
  );
};

export default Home;
