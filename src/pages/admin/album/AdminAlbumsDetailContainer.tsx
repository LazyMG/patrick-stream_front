import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { APIAlbum } from "../../../shared/models/album";

const AdminAlbumsDetailContainer: React.FC = () => {
  const { albumId } = useParams();
  const [albumData, setAlbumData] = useState<APIAlbum | null>();
  const [isLoading, setIsLoading] = useState(true);

  const getAlbum = async (id = "") => {
    const result = await fetch(
      `http://localhost:5000/album/${id}`
    ).then((res) => res.json());

    if (result.ok) {
      setAlbumData(result.album);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAlbum(albumId);
  }, [albumId]);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Outlet context={{ album: albumData, setAlbum: setAlbumData }} />
      )}
    </>
  );
};

export default AdminAlbumsDetailContainer;
