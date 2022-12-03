import { GetServerSideProps } from "next";
import Head from "next/head";
import { Grid } from "@mui/material";

import Content from "components/post/Content";

interface PostProps {
  post: {
    title: string;
    description: string;
    content: string;
    created: string;
  };
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.query.slug;
  const res = await fetch(`${process.env.apiURL}/posts/${slug}`);
  if (res.status == 404) {
    return {
      notFound: true,
    };
  }
  const post = await res.json();
  return {
    props: { post },
  };
};

export default function Post(props: PostProps) {
  const { post } = props;
  return (
    <>
      <Head>
        <title>CBlog</title>
        <meta name="description" content={post.description.slice(0, 50)} />
      </Head>
      <Grid container spacing={6} sx={{ my: 2 }}>
        <Grid item xs={12} lg={3} sx={{ display: {xs: "none", lg: "block"}}}></Grid>
        <Grid item xs={12} lg={9}>
          <Content post={post} />
        </Grid>
      </Grid>
    </>
  );
}
