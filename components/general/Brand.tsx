import { Typography } from "@mui/material";
import { description, logo } from "utils/constant";

export default function Brand() {
  return (
    <>
      <Typography
        variant="h2"
        align="center"
        color="primary.main"
        gutterBottom
        sx={{
          fontFamily: "monospace",
          fontWeight: 600,
        }}
      >
        {logo}
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        gutterBottom
      >
        {description}
      </Typography>
    </>
  );
}
