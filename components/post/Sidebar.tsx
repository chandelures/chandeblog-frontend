import { Divider, Box } from "@mui/material";
import Social from "components/general/Social";
import Brand from "components/general/Brand";

export default function Sidebar() {
  return (
    <Box sx={{ position: "sticky", top: "20px" }}>
      <Brand />
      <Divider sx={{ my: 4 }} />
      <Social />
    </Box>
  );
}
