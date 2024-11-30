import AdminLayout from "../../pages/admin/AdminLayout";

import AdminMain from "../../pages/admin/AdminMain";

import AdminMusicsNew from "../../pages/admin/music/AdminMusicsNew";
import AdminMusicsDetailContainer from "../../pages/admin/music/AdminMusicsDetailContainer";
import AdminDetailMusic from "../../pages/admin/music/AdminDetailMusic";
import AdminMusicEdit from "../../pages/admin/music/AdminMusicEdit";
import AdminMusics from "../../pages/admin/music/AdminMusics";

import AdminAlbumsNew from "../../pages/admin/album/AdminAlbumsNew";
import AdminAlbumsDetailContainer from "../../pages/admin/album/AdminAlbumsDetailContainer";
import AdminDetailAlbum from "../../pages/admin/album/AdminDetailAlbum";
import AdminAlbumEdit from "../../pages/admin/album/AdminAlbumEdit";
import AdminAlbums from "../../pages/admin/album/AdminAlbums";

import AdminArtistsNew from "../../pages/admin/artist/AdminArtistsNew";
import AdminArtistsDetailContainer from "../../pages/admin/artist/AdminArtistsDetailContainer";
import AdminDetailArtist from "../../pages/admin/artist/AdminDetailArtist";
import AdminArtistsEdit from "../../pages/admin/artist/AdminArtistsEdit";
import AdminArtists from "../../pages/admin/artist/AdminArtists";

import { RouteObject } from "react-router-dom";

export const adminRoute: RouteObject[] = [
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
        path: "albums",
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
        children: [
          {
            path: "new",
            element: <AdminArtistsNew />,
          },
          {
            path: ":artistId",
            element: <AdminArtistsDetailContainer />,
            children: [
              {
                index: true,
                element: <AdminDetailArtist />,
              },
              {
                path: "settings",
                element: <AdminArtistsEdit />,
              },
            ],
          },
          {
            path: "",
            element: <AdminArtists />,
          },
        ],
      },
    ],
  },
];
