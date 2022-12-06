import { Typography, Link, Stack } from "@mui/material";
import { socialLinks } from "utils/constant";

export default function Social() {
  return (
    <>
      <Typography variant="h4" gutterBottom color="text.primary">
        Links
      </Typography>
      {socialLinks.map((social) => (
        <Link
          href={social.url}
          variant="body1"
          display="block"
          key={social.name}
          sx={{ mb: 0.5 }}
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            color="text.primary"
          >
            <social.icon />
            <Typography component="span" color="primary">
              {social.name}
            </Typography>
          </Stack>
        </Link>
      ))}
    </>
  );
}
