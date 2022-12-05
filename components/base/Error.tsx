import { Box, Stack, Typography, Link } from "@mui/material";

interface ErrorProps {
  errorCode: number;
  message: string;
}

const links = [{ name: "Home", to: "/" }];

export default function Error(props: ErrorProps) {
  const { errorCode, message } = props;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <Box>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="h1"
            color="text.primary"
            sx={{ fontWeight: 400, mr: 1 }}
          >
            {errorCode}
          </Typography>
          <Typography variant="h1" color="text.primary" sx={{ mr: 1 }}>
            |
          </Typography>
          <Typography variant="h3" color="text.primary">
            {message}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="center" spacing={2}>
          {links.map(({ name, to }) => (
            <Link variant="h4" href={to} key={name}>
              {name}
            </Link>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
