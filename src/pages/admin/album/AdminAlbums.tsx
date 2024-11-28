import React from "react";
import { _getAlbums } from "../../../shared/lib/testAlbumFunc";
import AdminPageLayout from "../AdminPageLayout";

const AdminAlbums: React.FC = () => {
  const albums = _getAlbums();

  return <AdminPageLayout dataType="album" dataList={albums} />;
};

export default AdminAlbums;
