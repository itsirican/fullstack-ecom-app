import { Outlet } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import { Box } from "@chakra-ui/react";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <Box margin={30}>
        <Outlet />
      </Box>
    </div>
  );
};

export default RootLayout;
