import { createBrowserRouter } from "react-router-dom";
import { adminRoute } from "./adminRoute";
import Layout from "../../pages/Layout";
import { authRoute } from "./authRoute";
import Home from "../../pages/client/Home";
import User from "../../pages/client/User";
import Artist from "../../pages/client/Artist";
import Playlist from "../../pages/client/Playlist";
import Album from "../../pages/client/Album";
import GoogleLogin from "../../pages/client/GoogleLogin";
import RequireNoAuth from "../../pages/RequireNoAuth";
import Info from "../../pages/Info";
import Comming from "../../pages/client/Comming";
import ThemeMusic from "../../pages/client/ThemeMusic";
import ArtistWrapper from "../../pages/client/ArtistWrapper";
import ArtistContent from "../../pages/client/ArtistContent";
import ArtistMusics from "../../pages/client/ArtistMusics";
import Search from "../../pages/client/Search";

const router = createBrowserRouter([
  ...adminRoute,
  ...authRoute,
  {
    path: "/",
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
        element: <ArtistWrapper />,
        children: [
          {
            path: "",
            element: <ArtistContent />,
          },
          {
            path: "musics",
            element: <ArtistMusics />,
          },
        ],
      },
      {
        path: "playlists/:playlistId",
        element: <Playlist />,
      },
      {
        path: "albums/:albumId",
        element: <Album />,
      },
      {
        path: "info",
        element: <Info />,
      },
      {
        path: "comming",
        element: <Comming />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "new_releases",
        element: <ThemeMusic />,
      },
      {
        path: "trending",
        element: <ThemeMusic />,
      },
      {
        path: "popular",
        element: <ThemeMusic />,
      },
      {
        path: "listen_again",
        element: <ThemeMusic />,
      },
      {
        path: "liked",
        element: <ThemeMusic />,
      },
    ],
  },
  {
    path: "/google-login",
    element: (
      <RequireNoAuth>
        <GoogleLogin />
      </RequireNoAuth>
    ),
  },
]);

export default router;
