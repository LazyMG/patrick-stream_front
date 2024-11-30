import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { _getArtistInfo } from "../../../shared/lib/testArtistFunc";

const AdminArtistsDetailContainer: React.FC = () => {
  const { artistId } = useParams();
  const artist = _getArtistInfo(artistId || "");
  return <Outlet context={artist} />;
};

export default AdminArtistsDetailContainer;
