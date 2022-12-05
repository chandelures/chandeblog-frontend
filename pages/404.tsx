import Head from "next/head";
import Error from "components/base/Error";

const errorCode = 404;
const message = "😵 Page Not Found";
const title = "404: Page Not Found";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Error errorCode={errorCode} message={message} />
    </>
  );
}
