import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { _getAlbumInfo } from "../../../shared/lib/testAlbumFunc";

const AdminAlbumsDetailContainer: React.FC = () => {
  const { albumId } = useParams();
  const album = _getAlbumInfo(albumId || "");
  return <Outlet context={album} />;
};

export default AdminAlbumsDetailContainer;
