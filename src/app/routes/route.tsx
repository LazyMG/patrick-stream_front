import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../../pages/admin/AdminLayout";
import AdminMain from "../../pages/admin/AdminMain";
import AdminMusics from "../../pages/admin/AdminMusics";
import AdminAlbums from "../../pages/admin/AdminAlbums";
import AdminArtists from "../../pages/admin/AdminArtists";

import Layout from "../../pages/Layout";
import AdminDetailMusic from "../../pages/admin/AdminDetailMusic";
import AdminMusicsNew from "../../pages/admin/AdminMusicsNew";
import AdminMusicEdit from "../../pages/admin/AdminMusicEdit";
import AdminMusicsDetailContainer from "../../pages/admin/AdminMusicsDetailContainer";
import AdminAlbumsNew from "../../pages/admin/AdminAlbumsNew";
import AdminAlbumsDetailContainer from "../../pages/admin/AdminAlbumsDetailContainer";
import AdminDetailAlbum from "../../pages/admin/AdminDetailAlbum";
import AdminAlbumEdit from "../../pages/admin/AdminAlbumEdit";

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
            element: <AdminMusicsDetailContainer />,
            children: [
              {
                index: true,
                element: <AdminDetailMusic />,
              },
              {
                path: "settings",
                element: <AdminMusicEdit />,
              },
            ],
          },
          {
            path: "",
            element: <AdminMusics />,
          },
        ],
      },
      {
        path: "ablums",
        children: [
          {
            path: "new",
            element: <AdminAlbumsNew />,
          },
          {
            path: ":albumId",
            element: <AdminAlbumsDetailContainer />,
            children: [
              {
                index: true,
                element: <AdminDetailAlbum />,
              },
              {
                path: "settings",
                element: <AdminAlbumEdit />,
              },
            ],
          },
          {
            path: "",
            element: <AdminAlbums />,
          },
        ],
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
