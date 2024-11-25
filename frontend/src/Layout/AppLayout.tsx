import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Box } from "@chakra-ui/react";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Box margin={30}>
        <Outlet />
      </Box>
    </>
  );
};

export default AppLayout;
