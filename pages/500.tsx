import Head from "next/head";
import Error from "components/base/Error";
import { name } from "utils/constant";

const errorCode = 500;
const message = "😭 Internal Server Error";
const title = "500: Internal Server Error";

export default function Custom500() {
  return (
    <>
      <Head>
        <title>{`${name} - ${title}`}</title>
      </Head>
      <Error errorCode={errorCode} message={message} />
    </>
  );
}
