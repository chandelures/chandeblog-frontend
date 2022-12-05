import { GetServerSideProps } from "next";
import Head from "next/head";
import { Grid, Stack } from "@mui/material";

import PostList from "components/index/PostList";
import Paginator from "components/index/Paginator";
import Sidebar from "components/index/SideBar";

type HomeProps = {
  page: number;
  pageCount: number;
  data: {
    count: number;
    results: readonly {
      title: string;
      description: string;
      created: string;
      slug: string;
    }[];
  };
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=30, stale-while-revalidate=59"
  );
  const page = parseInt(String(query.page)) || 1;
  const size = 5;
  const request = await fetch(
    `${process.env.apiURL}/posts?page=${page}&size=${size}`
  );
  const data = await request.json();
  const pageCount = Math.ceil(data.count / size);

  return {
    props: { data, page, pageCount },
  };
};

export default function Home(props: HomeProps) {
  const { data, page, pageCount } = props;

  return (
    <>
      <Head>
        <title>CBlog</title>
        <meta name="description" content="chandelure's blog" />
      </Head>
      <Grid container spacing={6} sx={{ my: 2 }}>
        <Grid item xs={12} lg={3}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} lg={9}>
          <PostList posts={data.results} />
          <Stack alignItems="center" sx={{ mt: 10, mb: 6 }}>
            <Paginator count={pageCount} page={page} />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
