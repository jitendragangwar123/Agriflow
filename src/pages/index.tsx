import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../layouts/Layout";


const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>AgriFlow</title>
        <meta name="description" content="AgriFlow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout children={undefined}>
      </Layout>
    </>
  );
};

export default Home;
