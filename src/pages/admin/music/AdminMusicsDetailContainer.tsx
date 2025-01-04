import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { APIMusic } from "../../../shared/models/music";

const AdminMusicsDetailContainer: React.FC = () => {
  const { musicId } = useParams();
  const [musicData, setMusicData] = useState<APIMusic | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getMusic = async (id = "") => {
    const result = await fetch(
      `http://localhost:5000/music/${id}`
    ).then((res) => res.json());

    if (result.ok) {
      setMusicData(result.music);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMusic(musicId);
  }, [musicId]);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Outlet context={{ music: musicData, setMusic: setMusicData }} />
      )}
    </>
  );
};

export default AdminMusicsDetailContainer;
