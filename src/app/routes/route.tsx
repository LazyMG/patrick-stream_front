import { createBrowserRouter } from "react-router-dom";
import { adminRoute } from "./adminRoute";
import Layout from "../../pages/Layout";
import { authRoute } from "./authRoute";
import YoutubeTest from "../../pages/YoutubeTest";

const router = createBrowserRouter([
  ...adminRoute,
  ...authRoute,
  {
    path: "test",
    element: <YoutubeTest />,
  },
  {
    path: "",
    element: <Layout />,
  },
]);

export default router;
