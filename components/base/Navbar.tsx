import {
  Button,
  AppBar,
  Toolbar,
  Container,
  Typography,
  Box,
} from "@mui/material";

const logo = "CBlOG";
const links = [
  { name: "Home", to: "/" },
  { name: "About", to: "#" },
];

export default function Navbar() {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {logo}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {links.map((link) => (
              <Button
                key={link.name}
                href={link.to}
                sx={{ color: "white", display: "block" }}
              >
                {link.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
