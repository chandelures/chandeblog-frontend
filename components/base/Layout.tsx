import { ReactNode } from "react";
import { Container } from "@mui/material";

import Navbar from "components/base/Navbar";
import Footer from "components/base/Footer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
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
