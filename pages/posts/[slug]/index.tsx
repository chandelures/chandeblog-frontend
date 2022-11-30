import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.query.slug;
  const res = await fetch(`${process.env.apiURL}/posts/${slug}`);
  console.log(res)
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
  return <></>;
}
