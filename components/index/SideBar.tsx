import React from "react";
import { Divider, Typography, Link, Stack } from "@mui/material";

interface SidebarProps {
  socials: readonly {
    icon: React.ElementType;
    name: string;
    url: string;
  }[];
}

export default function Sidebar(props: SidebarProps) {
  const { socials } = props;
  return (
    <>
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        color="primary.main"
        sx={{
          fontFamily: "monospace",
          fontWeight: 600,
        }}
      >
        CBLOG
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.primary"
        gutterBottom
      >
        {"chandelure's blog"}
      </Typography>
      <Divider sx={{ my: 4 }} />
      <Typography variant="h6" gutterBottom color="text.primary">
        Links
      </Typography>
      {socials.map((social) => (
        <Link
          href={social.url}
          variant="body1"
          display="block"
          color="text.primary"
          key={social.name}
          sx={{ mb: 0.5 }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <social.icon />
            <span>{social.name}</span>
          </Stack>
        </Link>
      ))}
    </>
  );
}
