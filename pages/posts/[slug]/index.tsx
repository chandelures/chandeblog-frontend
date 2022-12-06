import { GetServerSideProps } from "next";
import Head from "next/head";
import { Grid } from "@mui/material";

import { name, apiURL } from "utils/constant";
import Layout from "components/base/Layout";
import Content from "components/post/Content";
import SideBar from "components/post/Sidebar";

interface PostProps {
  post: {
    title: string;
    description: string;
    content: string;
    created: string;
  };
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=30, stale-while-revalidate=59"
  );
  const slug = query.slug;
  const request = await fetch(`${apiURL}/posts/${slug}`);
  if (request.status == 404) {
    return {
      notFound: true,
    };
  }
  const post = await request.json();
  return {
    props: { post },
  };
};

export default function Post(props: PostProps) {
  const { post } = props;
  return (
    <Layout>
      <Head>
        <title>{`${name} - ${post.title}`}</title>
        <meta name="description" content={post.description.slice(0, 50)} />
      </Head>
      <Grid container spacing={6} sx={{ my: 2 }}>
        <Grid item xs={12} lg={3} sx={{ display: { xs: "none", lg: "block" } }}>
          <SideBar />
        </Grid>
        <Grid item xs={12} lg={9}>
          <Content post={post} />
        </Grid>
      </Grid>
    </Layout>
  );
}
