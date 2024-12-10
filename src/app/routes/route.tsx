import { createBrowserRouter } from "react-router-dom";
import { adminRoute } from "./adminRoute";
import Layout from "../../pages/Layout";
import { authRoute } from "./authRoute";
import Home from "../../pages/client/Home";
import User from "../../pages/client/User";
import Artist from "../../pages/client/Artist";
import Playlist from "../../pages/client/Playlist";
import Album from "../../pages/client/Album";

const router = createBrowserRouter([
  ...adminRoute,
  ...authRoute,
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "users/:userId",
        element: <User />,
      },
      {
        path: "artists/:artistId",
        element: <Artist />,
      },
      {
        path: "playlists/:playlistId",
        element: <Playlist />,
      },
      {
        path: "albums/:albumId",
        element: <Album />,
      },
    ],
  },
]);

export default router;
