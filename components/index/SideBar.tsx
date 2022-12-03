import React from "react";
import { Divider, Typography } from "@mui/material";
import Social from "components/general/Social";
import Brand from "components/general/Brand";

export default function Sidebar() {
  return (
    <>
      <Brand />
      <Divider sx={{ my: 4 }} />
      <Social />
    </>
  );
}
