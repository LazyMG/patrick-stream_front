import React from "react";
import { _getMusics } from "../../../shared/lib/testMusicFunc";
import AdminPageLayout from "../AdminPageLayout";

const AdminMusics: React.FC = () => {
  const musics = _getMusics();

  return <AdminPageLayout dataType="music" dataList={musics} />;
};

export default AdminMusics;
