import Head from "next/head";
import Error from "components/base/Error";
import { name } from "utils/constant";

const errorCode = 404;
const message = "😵 Page Not Found";
const title = "404: Page Not Found";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>{`${name} - ${title}`}</title>
      </Head>
      <Error errorCode={errorCode} message={message} />
    </>
  );
}
