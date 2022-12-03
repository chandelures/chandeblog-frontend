import GitHub from "@mui/icons-material/GitHub";
import Mail from "@mui/icons-material/Mail";
import { Typography, Link, Stack } from "@mui/material";

const socials = [
  { name: "Github", icon: GitHub, url: "https://github.com/chandelures" },
  { name: "Mail", icon: Mail, url: "mailto:wanghch@chandelure.me" },
];

export default function Social() {
  return (
    <>
      <Typography variant="h6" gutterBottom color="text.primary">
        Links
      </Typography>
      {socials.map((social) => (
        <Link
          href={social.url}
          variant="body1"
          display="block"
          key={social.name}
          sx={{ mb: 0.5 }}
        >
          <Stack direction="row" spacing={1} alignItems="center" color="text.primary">
            <social.icon />
            <Typography component="span" color="primary">{social.name}</Typography>
          </Stack>
        </Link>
      ))}
    </>
  );
}
