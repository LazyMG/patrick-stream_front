import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../../pages/admin/AdminLayout";
import AdminMain from "../../pages/admin/AdminMain";
import AdminMusics from "../../pages/admin/AdminMusics";
import AdminAlbums from "../../pages/admin/AdminAlbums";
import AdminArtists from "../../pages/admin/AdminArtists";

import Layout from "../../pages/Layout";
import AdminDetailMusic from "../../pages/admin/AdminDetailMusic";
import AdminMusicsNew from "../../pages/admin/AdminMusicsNew";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "main",
        element: <AdminMain />,
      },
      {
        path: "musics",
        children: [
          {
            path: "new",
            element: <AdminMusicsNew />,
          },
          {
            path: ":musicId",
            element: <AdminDetailMusic />,
          },
          {
            path: "",
            element: <AdminMusics />,
          },
        ],
      },
      {
        path: "albums",
        element: <AdminAlbums />,
      },
      {
        path: "artists",
        element: <AdminArtists />,
      },
    ],
  },
  {
    path: "",
    element: <Layout />,
  },
]);

export default router;
