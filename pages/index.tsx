import { GetServerSideProps } from "next";
import Head from "next/head";
import { Grid } from "@mui/material";
import Main from "components/index/Main";
import Sidebar from "components/index/SideBar";
import GitHubIcon from "@mui/icons-material/GitHub";
import Mail from "@mui/icons-material/Mail";

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = parseInt(String(context.query.page)) || 1;
  const size = 5;
  const res = await fetch(
    `${process.env.apiURL}/posts?page=${page}&size=${size}`
  );
  const data = await res.json();
  const pageCount = Math.ceil(data.count / size);

  return {
    props: { data, page, pageCount },
  };
};

const socials = [
  { name: "Github", icon: GitHubIcon, url: "https://github.com/chandelures" },
  { name: "Mail", icon: Mail, url: "mailto://me@chandelure.me" },
];

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
          <Sidebar socials={socials} />
        </Grid>
        <Grid item xs={12} lg={9}>
          <Main posts={data.results} page={page} pageCount={pageCount} />
        </Grid>
      </Grid>
    </>
  );
}
