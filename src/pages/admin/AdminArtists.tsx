import React from "react";
import AdminPageLayout from "./AdminPageLayout";
import { _getAritsts } from "../../shared/lib/testArtistFunc";

const AdminArtists: React.FC = () => {
  const artists = _getAritsts();
  return <AdminPageLayout dataType={"artist"} dataList={artists} />;
};

export default AdminArtists;
