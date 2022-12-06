import { Box, Container, Typography, Link } from "@mui/material";
import { description } from "utils/constant";

export default function Footer() {
  return (
    <Box component="footer" sx={{ mt: 8 }}>
      <Container
        maxWidth="lg"
        sx={{ py: 6, borderTop: 1, borderColor: "text.disabled" }}
      >
        <Typography variant="body2" color="text.secondary" align="center">
          {"Copyright © "}
          <Link href="/">{description}</Link>{" "}
          {`2021-${new Date().getFullYear()}`}
          {"."}
        </Typography>
      </Container>
    </Box>
  );
}
