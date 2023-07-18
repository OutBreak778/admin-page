import { Box, useMediaQuery } from "@mui/material";
import Row1 from "./Row1";
import Row2 from "./Row2";

// large screen Grid Template Area
const gridTemplateLargeScreen = `
    "a b c"
    "a b c"
    "a b c"
    "a b c"
    "d b c"
    "d b c"
    "d e c"
    "d e c"
    "d e c"
    "d e c"    
`;

// small screen Grid Template Area
const gridTemplateSmallScreen = `
    "a"
    "a"
    "a"
    "a"
    "a"
    "b"
    "b"
    "b"
    "b"
    "b"
    "b"
    "c"
    "c"
    "c"
    "c"
    "d"
    "d"
    "d"
    "d"
    "d"
    "e"
    "e"
    "e"
    "f"

    
`;

const Dashboard = () => {
  const isAboveMediumScreen = useMediaQuery("(min-width: 1000px)");

  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="0.8rem"
      sx={
        isAboveMediumScreen
          ? {
              // it make responsive or not to page by using inbuilt useMediaQuery
              gridTemplateColumns: "repeat(3, minmax(360px, 1fr))",
              gridTemplateRows: "repeat(10, minmax(55px, 1fr))",
              gridTemplateAreas: gridTemplateLargeScreen,
            }
          : {
              gridAutoColumns: "1fr",
              gridAutoRows: "80px",
              gridTemplateAreas: gridTemplateSmallScreen,
              gap: "1.2em",
            }
      }
    >
      <Row1 />
      <Row2 />
    </Box>
  );
};

export default Dashboard;
