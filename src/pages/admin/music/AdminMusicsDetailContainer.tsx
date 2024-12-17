import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

const AdminMusicsDetailContainer: React.FC = () => {
  const { musicId } = useParams();
  const [music, setMusic] = useState();

  const getMusic = async (id = "") => {
    const result = await fetch(
      `http://localhost:5000/music/${id}`
    ).then((res) => res.json());

    if (result.ok) {
      // console.log(result.music);
      setMusic(result.music);
    }
  };

  useEffect(() => {
    getMusic(musicId);
  }, [musicId]);

  return <Outlet context={music} />;
};

export default AdminMusicsDetailContainer;
