import { createBrowserRouter } from "react-router-dom";
import { adminRoute } from "./adminRoute";
import Layout from "../../pages/Layout";
import { authRoute } from "./authRoute";
import YoutubeTest from "../../pages/YoutubeTest";
import Home from "../../pages/client/Home";

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
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
]);

export default router;
