import { Typography } from "@mui/material";

const logo = "CBLOG";
const description = "chandelure's blog";

export default function Brand() {
  return (
    <>
      <Typography
        variant="h5"
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
