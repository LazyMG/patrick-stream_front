import { createBrowserRouter } from "react-router-dom";
import Layout from "../../pages/Layout";
import { adminRoute } from "./adminRoute";

const router = createBrowserRouter([
  ...adminRoute,
  {
    path: "",
    element: <Layout />,
  },
]);

export default router;
