import { ReactElement } from "react";
import { Container } from "@mui/material";

import Navbar from "components/base/Navbar";
import Footer from "components/base/Footer";

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ minHeight: "80vh" }}>
        <main>{children}</main>
      </Container>
      <Footer />
    </>
  );
}
