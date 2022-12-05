import Head from "next/head";
import Error from "components/base/Error";

const errorCode = 500;
const message = "😭 Internal Server Error";
const title = "500: Internal Server Error";

export default function Custom500() {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Error errorCode={errorCode} message={message} />
    </>
  );
}
