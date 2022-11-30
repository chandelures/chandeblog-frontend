import { GetServerSideProps } from "next";
import Head from "next/head";
import { Grid } from "@mui/material";
import Main from "components/index/Main";

type HomeProps = {
  data: {};
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = context.query.page || 1;
  const size = 5;
  const res = await fetch(
    `${process.env.apiURL}/posts?page=${page}&size=${size}`
  );
  const data = await res.json();

  return {
    props: { data },
  };
};

export default function Home({ data }: HomeProps) {
  return (
    <>
      <Head>
        <title>CBlog</title>
        <meta name="description" content="chandelure's blog" />
      </Head>
      <Grid
        container
        spacing={2}
        sx={{ my: 3 }}
      >
        <Grid item xs={12} lg={3}></Grid>
        <Grid item xs={12} lg={9}>
          <Main />
        </Grid>
      </Grid>
    </>
  );
}
