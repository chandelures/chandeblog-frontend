import { GetServerSideProps } from "next";
import Main from "components/post/Main";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.query.slug;
  const res = await fetch(`${process.env.apiURL}/posts/${slug}`);
  if (res.status == 404) {
    return {
      notFound: true,
    };
  }
  const data = await res.json();
  return {
    props: { data },
  };
};

export default function Post({ data }: { data: JSON }) {
  return (
    <>
      <Main />
    </>
  );
}
