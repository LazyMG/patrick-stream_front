import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { _getMusicInfo } from "../../../shared/lib/testMusicFunc";

const AdminMusicsDetailContainer: React.FC = () => {
  const { musicId } = useParams();
  const music = _getMusicInfo(musicId || "");
  return <Outlet context={music} />;
};

export default AdminMusicsDetailContainer;
