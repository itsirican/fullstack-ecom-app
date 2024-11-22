import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import HomePage from "../pages";
import AboutPage from "../pages/About";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* <Route path="/" element={<HomePage />}> */}
      <Route index element={<HomePage />} />
      <Route path="about" element={<AboutPage />} />
      {/* </Route> */}
    </>
  )
);

export default router;
