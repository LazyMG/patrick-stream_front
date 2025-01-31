import { createBrowserRouter } from "react-router-dom";
import { adminRoute } from "./adminRoute";
import { authRoute } from "./authRoute";

import Layout from "../../pages/Layout";

import Home from "../../pages/client/Home";
import Playlist from "../../pages/client/Playlist";
import Album from "../../pages/client/Album";
import Info from "../../pages/client/Info";
import Comming from "../../pages/client/Comming";
import Search from "../../pages/client/Search";

import ThemeMusic from "../../pages/client/ThemeMusic";

import ArtistWrapper from "../../pages/client/Artist/ArtistWrapper";
import ArtistContent from "../../pages/client/Artist/ArtistContent";
import ArtistMusics from "../../pages/client/Artist/ArtistMusics";
import ArtistsAlbums from "../../pages/client/Artist/ArtistsAlbums";

import UserWrapper from "../../pages/client/User/UserWrapper";
import UserContent from "../../pages/client/User/UserContent";
import UserFollowings from "../../pages/client/User/UserFollowings";

import RequireNoAuth from "../../pages/RequireNoAuth";
import GoogleLogin from "../../pages/client/GoogleLogin";
import NotFound from "../../pages/client/NotFound";

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
        element: <UserWrapper />,
        children: [
          {
            path: "",
            element: <UserContent />,
          },
          {
            path: "followings",
            element: <UserFollowings />,
          },
        ],
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
          {
            path: "albums",
            element: <ArtistsAlbums />,
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
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
