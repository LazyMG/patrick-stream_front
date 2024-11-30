import { createBrowserRouter } from "react-router-dom";
import { adminRoute } from "./adminRoute";
import Layout from "../../pages/Layout";
import { authRoute } from "./authRoute";

const router = createBrowserRouter([
  ...adminRoute,
  ...authRoute,
  {
    path: "",
    element: <Layout />,
  },
]);

export default router;
